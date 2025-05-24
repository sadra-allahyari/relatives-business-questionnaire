import { z } from "zod";
import {
  businessCategoryOptions,
  businessOwnerRelationOptions,
} from "@/lib/hooks/constants";

const businessCategoryEnum = z.enum(
  Object.keys(businessCategoryOptions) as [string, ...string[]]
);

const businessOwnerRelationEnum = z.enum(
  Object.keys(businessOwnerRelationOptions) as [string, ...string[]]
);

export const businessSchema = z.object({
  businessName: z.string().min(1, "نام کسب و کار الزامی است"),
  businessCategory: businessCategoryEnum.optional(),
  businessLink: z.array(z.string().optional()),
  businessWebsite: z.string().optional(),
  businessContactNumber: z
    .string()
    .length(11, "شماره تماس باید ۱۱ رقم باشد")
    .regex(/^09\d{9}$/, "شماره تماس باید با 09 شروع شده و ۱۱ رقم باشد")
    .transform((val) => val.replace(/^0/, "+98")),
  businessAddress: z.string().min(1, "آدرس کسب و کار الزامی است"),
  businessNote: z.string().optional(),
  businessOwnerName: z.string().min(1, "نام صاحب کسب و کار الزامی است"),
  businessOwnerRelation: businessOwnerRelationEnum.optional(),
});
