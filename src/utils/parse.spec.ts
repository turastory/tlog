import { parseFilePath, containsKorean } from "./parse";

describe("parseFilePath", () => {
  it("should parse date and language correctly", () => {
    const result = parseFilePath("/20220101-filename-is-en/");
    expect(result).toEqual({
      originalString: "/20220101-filename-is-en/",
      fileName: "filename-is",
      date: "20220101",
      language: "en",
    });
  });

  it("should parse date correctly when language is not present", () => {
    const result = parseFilePath("/20220101-file-name/");
    expect(result).toEqual({
      originalString: "/20220101-file-name/",
      fileName: "file-name",
      date: "20220101",
    });
  });

  it("should parse language correctly when date is not present", () => {
    const result = parseFilePath("/file-name-en/");
    expect(result).toEqual({
      originalString: "/file-name-en/",
      fileName: "file-name",
      language: "en",
    });
  });

  it("should return original string when date and language are not present", () => {
    const result = parseFilePath("/random/");
    expect(result).toEqual({
      originalString: "/random/",
      fileName: "random",
    });
  });
});

describe("containsKorean", () => {
  it("should return true when text contains more than 10% Korean characters", () => {
    const result = containsKorean("안녕하세요, world!");
    expect(result).toBe(true);
  });

  it("should return false when text contains less than 10% Korean characters", () => {
    const result = containsKorean("Hello, world! My name is 윤.");
    expect(result).toBe(false);
  });

  it("should return false when text contains no Korean characters", () => {
    const result = containsKorean("Hello, world!");
    expect(result).toBe(false);
  });
});
