export function convertDate(str: string) {
  if (typeof str !== "string" || !/^\d{8}$/.test(str)) {
    throw new Error(`Invalid date format. Expected YYYYMMDD.`);
  }

  return str.slice(0, 4) + "-" + str.slice(4, 6) + "-" + str.slice(6);
}
