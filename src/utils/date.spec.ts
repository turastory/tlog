import { convertDate } from "./date";

describe("convertDate", () => {
  it("should correctly format YYYYMMDD to YYYY-MM-DD", () => {
    const result = convertDate("20220101");
    expect(result).toBe("2022-01-01");
  });

  it("should throw an error when input is not in YYYYMMDD format", () => {
    expect(() => convertDate("202201")).toThrow(
      "Invalid date format. Expected YYYYMMDD."
    );
  });

  it("should throw an error when input is not a string", () => {
    expect(() => convertDate(20220101 as any)).toThrow(
      "Invalid date format. Expected YYYYMMDD."
    );
  });
});
