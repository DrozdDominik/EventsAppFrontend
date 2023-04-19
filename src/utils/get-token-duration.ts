export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');

  if (storedExpirationDate !== null) {
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    return expirationDate.getTime() - now.getTime();
  }

  return 0;
}
