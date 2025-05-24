import { z } from "zod";
import { businessSchema } from "@/lib/hooks/validations";

/**
 * Schema for Step 3 of the form.
 * Validates an array of business entries.
 *
 * @const
 * @type {z.ZodObject}
 */
export const step3Schema = z.object({
  /**
   * Array of business objects.
   * Must contain at least one valid business entry.
   */
  businesses: z.array(businessSchema).min(1, "حداقل یک کسب و کار را وارد کنید"),
});
