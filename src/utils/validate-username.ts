export const validateUsername = (name: string): boolean => {
  return !!name && name.length > 1 && name.length <= 30;
};
