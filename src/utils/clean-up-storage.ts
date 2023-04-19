export const cleanUpLocalStorage = (): void => {
  localStorage.removeItem('role');
  localStorage.removeItem('expiration');
};
