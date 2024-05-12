export interface UseForm<T, R> {
  show?: boolean;

  onSuccess?: (formData: T, response: R) => void;

  onError?: (error: any) => void;
}
