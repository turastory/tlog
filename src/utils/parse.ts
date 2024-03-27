export type ParsedResult = {
  originalString: string;
  fileName: string;
  date?: string;
  language?: string;
  [key: string]: string | undefined;
};

export function parseFilePath(filePath: string): ParsedResult {
  const match = filePath.match(/\/(?:(\d{8})-)?(.*?)(?:-(\w{2}))?\//);
  if (!match) {
    throw new Error(`Invalid file path: ${filePath}`);
  }

  const [, date, fileName, language] = match;

  return {
    originalString: filePath,
    date: date ?? undefined,
    fileName,
    language: language ?? undefined,
  };
}

/**
 * Check if the given text contains Korean characters. (10% as a threshold)
 */
export function containsKorean(text: string): boolean {
  const totalChars: number = text.length;
  const koreanChars: number = (text.match(/[\u3131-\uD79D]/g) || []).length; // Korean Unicode range
  return koreanChars / totalChars > 0.1;
}
