export const addProtocol = (link: string): string => {
  try {
    new URL(link);
  } catch (_) {
    return `https://${link}`;
  }

  return link;
};
