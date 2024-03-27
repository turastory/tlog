export type ParsedResult = {
  originalString: string;
  date?: string;
  language?: string;
};

export function parseFilePath(str: string): ParsedResult {
  const result: ParsedResult = { originalString: str };

  // Regular expression to match the optional date and language
  // Assumes the date is formatted as YYYYMMDD and comes after a slash
  // and the optional language is a 2-letter code after a dash at the end
  const regex = /\/(\d{8})?.*?(-([a-z]{2}))?\/$/;
  const matches = str.match(regex);

  if (matches) {
    // If there's a date match, it will be in index 1
    if (matches[1]) {
      result.date = matches[1];
    }

    // If there's a language match, it will be in index 3
    if (matches[3]) {
      result.language = matches[3];
    }
  }

  return result;
}
