import { addProtocolIfMissing } from "./addProtocolIfMissing";
import { isValidCustomUrl } from "./isValidCustomUrl";

export const isSimpleValidUrl = (url: string): boolean => {
  const urlWithProtocol = addProtocolIfMissing(url);
  // Vérifier si l'URL est au format www.example.com
  const urlWithoutProtocol = urlWithProtocol.replace(/^(https?:\/\/)/, "");
  return isValidCustomUrl(urlWithoutProtocol);
};
