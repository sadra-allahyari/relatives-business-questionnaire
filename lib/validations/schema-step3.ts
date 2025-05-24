import { z } from "zod";
import {
  businessCategoryOptions,
  businessOwnerRelationOptions,
} from "@/lib/constants";

/**
 * Enum schema for validating a business category selected from predefined options.
 * @const
 */
const businessCategoryEnum = z.enum(businessCategoryOptions);

/**
 * Enum schema for validating the relationship between the user and the business owner.
 * @const
 */
const businessOwnerRelationEnum = z.enum(businessOwnerRelationOptions);

/**
 * Zod schema used to validate business form data.
 *
 * @const
 * @type {z.ZodObject}
 */
const businessSchema = z.object({
  /**
   * Name of the business (required).
   * Minimum 1 character.
   */
  business_name: z.string().min(1, "نام کسب و کار الزامی است"),

  /**
   * Category of the business (optional).
   * Must match one of the predefined categories.
   */
  business_category: businessCategoryEnum.optional(),

  /**
   * List of associated links (optional).
   * Each item is a string or undefined.
   */
  business_link: z.array(z.string().optional()),

  /**
   * Website URL of the business (optional).
   */
  business_website: z.string().optional(),

  /**
   * Phone number of the business (required).
   * Must be 11 digits and start with "09".
   * It is transformed to international format ("+98...").
   */
  business_number: z
    .string()
    .length(11, "شماره تماس باید ۱۱ رقم باشد")
    .regex(/^09\d{9}$/, "شماره تماس باید با 09 شروع شده و ۱۱ رقم باشد")
    .transform((val) => val.replace(/^0/, "+98")),

  /**
   * Address of the business (required).
   */
  business_address: z.string().min(1, "آدرس کسب و کار الزامی است"),

  /**
   * Optional note or comment about the business.
   */
  business_note: z.string().optional(),

  /**
   * Full name of the business owner (required).
   */
  business_owner_name: z.string().min(1, "نام صاحب کسب و کار الزامی است"),

  /**
   * The relationship between the user and the business owner (optional).
   * Must match one of the predefined relations.
   */
  business_owner_relation: businessOwnerRelationEnum.optional(),
});

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
