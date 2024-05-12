import { createContext, useCallback, useEffect, useReducer } from 'react';
// utils
import axios from '../utils/axios';
//
import { isValidToken, setSession } from './utils';
import {
  ActionMapType,
  AuthStateType,
  AuthUserType,
  JWTContextType,
} from './types';
import { PATH_DASHBOARD } from '../routes/paths';
import { useRouter } from 'next/router';
import { shortenWalletAddress } from '../utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: {
    isAuthenticated: boolean;
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      isInitialized: true,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const { push } = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const urlOrigin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';
  const initialize = useCallback(async () => {
    try {
      const accessToken =
        typeof window !== 'undefined'
          ? localStorage.getItem('accessToken')
          : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const { data: me } = await axios.get('/admins/me');

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user: {
              createdAt: me.createdAt,
              email: me.email,
              id: me.id,
              imageUrl: me.imageUrl || `${urlOrigin}/assets/images/mascot.png`,
              name:
                me.name.length > 30
                  ? shortenWalletAddress(me.name, 4)
                  : me.name,
              nonce: me.nonce,
              roles: me.roles,
              title: me.title,
              updatedAt: me.updatedAt,
              walletAddress: me.walletAddress,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = async (walletAddress: string, signature: string) => {
    try {
      const response = await axios.post('/auth-admin/login', {
        walletAddress,
        signature,
      });
      const { accessToken } = response.data;
      setSession(accessToken);

      const { data: me } = await axios.get('/admins/me');

      dispatch({
        type: Types.LOGIN,
        payload: {
          user: {
            createdAt: me.createdAt,
            email: me.email,
            id: me.id,
            imageUrl: me.imageUrl || `${urlOrigin}/assets/images/mascot.png`,
            name:
              me.name?.length > 30 ? shortenWalletAddress(me.name, 4) : me.name,
            nonce: me.nonce,
            roles: me.roles,
            title: me.title,
            updatedAt: me.updatedAt,
            walletAddress: me.walletAddress,
          },
        },
      });
      await push(PATH_DASHBOARD.courseClient);
    } catch (e) {
      console.log(e.error);
    }
  };

  // REGISTER
  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: Types.REGISTER,
      payload: {
        user,
      },
    });
  };

  // LOGOUT
  const logout = async () => {
    await axios.post('/auth-admin/logout');
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
      payload: {
        isAuthenticated: false,
      },
    });
    await push(PATH_DASHBOARD.auth);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        loginWithGoogle: () => {},
        loginWithGithub: () => {},
        loginWithTwitter: () => {},
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
