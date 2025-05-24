import { z } from "zod";

/**
 * Schema for Step 1 of the form.
 * Validates the presence of a full name.
 *
 * @const
 * @type {z.ZodObject}
 */
export const step1Schema = z.object({
  /**
   * Full name of the user (required).
   * Must be at least 1 character.
   */
  name: z.string().min(1, "نام و نام خانوادگی الزامی است"),
});
