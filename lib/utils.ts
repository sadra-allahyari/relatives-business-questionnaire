import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines arbitrary class values (booleans, strings, arrays, objects) into a single
 * className string and intelligently merges Tailwind CSS utility classes to avoid conflicts.
 *
 * @param {...ClassValue[]} inputs - A list of `clsx`-compatible class values.
 * @returns {string} A single merged className string.
 *
 * @example
 * ```ts
 * const buttonClass = cn(
 *   "px-4 py-2",
 *   isActive && "bg-blue-500",
 *   { "text-white": isActive, "text-gray-500": !isActive }
 * );
 * // => "px-4 py-2 bg-blue-500 text-white"
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
