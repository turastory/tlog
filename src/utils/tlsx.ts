import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const tlsx = (...args: ClassValue[]) => twMerge(clsx(...args));
