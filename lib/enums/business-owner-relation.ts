import { z } from "zod";
import { businessOwnerRelationOptions } from "@/lib/constants";

/**
 * Enum schema for validating the relationship between the user and the business owner.
 * @const
 */
export const businessOwnerRelationEnum = z.enum(businessOwnerRelationOptions);
