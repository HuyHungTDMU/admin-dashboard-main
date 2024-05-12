import Router from 'next/router';

export default function redirectTo404Page() {
  Router.push('/404');
}
