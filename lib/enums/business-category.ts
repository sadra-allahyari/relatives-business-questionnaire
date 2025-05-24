import { z } from "zod";
import { businessCategoryOptions } from "@/lib/constants";

/**
 * Enum schema for validating a business category selected from predefined options.
 * @const
 */
export const businessCategoryEnum = z.enum(businessCategoryOptions);
