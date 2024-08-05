export const addProtocolIfMissing = (url: string): string => {
    if (!/^https?:\/\//i.test(url)) {
      return `http://${url}`;
    }
    return url;
  };