import { parseFilePath } from "./parse";

describe("parseFilePath", () => {
  it("should parse date and language correctly", () => {
    const result = parseFilePath("/20220101-en/");
    expect(result).toEqual({
      originalString: "/20220101-en/",
      date: "20220101",
      language: "en",
    });
  });

  it("should parse date correctly when language is not present", () => {
    const result = parseFilePath("/20220101/");
    expect(result).toEqual({
      originalString: "/20220101/",
      date: "20220101",
    });
  });

  it("should parse language correctly when date is not present", () => {
    const result = parseFilePath("/-en/");
    expect(result).toEqual({
      originalString: "/-en/",
      language: "en",
    });
  });

  it("should return original string when date and language are not present", () => {
    const result = parseFilePath("/random/");
    expect(result).toEqual({
      originalString: "/random/",
    });
  });
});
