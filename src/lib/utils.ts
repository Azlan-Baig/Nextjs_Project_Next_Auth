import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

//Saari ki saari classes ko merge kardeta hai.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
