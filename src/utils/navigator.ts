export const copyToClipboard = (
  data: any,
  onSuccess?: () => void,
  onError?: () => void,
) => {
  navigator.clipboard.writeText(data).then(
    () => onSuccess?.(),
    () => {
      onError?.();
    },
  );
};

export const shortenWalletAddress = (address: string, numChars: number) => {
  if (!address) return '';
  const prefix = address.slice(0, numChars);
  const suffix = address.slice(-numChars);

  return `${prefix}...${suffix}`;
};
