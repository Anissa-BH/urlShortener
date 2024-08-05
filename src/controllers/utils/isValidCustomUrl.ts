export const isValidCustomUrl = (url: string): boolean => {
  // Expression régulière pour valider le format www.example.com
  const regex = /^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  return regex.test(url);
};
