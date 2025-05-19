import { z } from "zod";

export const businessSchema = z.object({
  businessName: z.string().min(1, "نام کسب و کار الزامی است"),
  businessCategory: z.string().optional(),
  businessLink: z.string().optional(),
  businessWebsite: z.string().optional(),
  businessContactNumber: z.coerce.number().min(1, "شماره کسب و کار الزامی است"),
  businessAddress: z.string().min(1, "آدرس کسب و کار الزامی است"),
  businessNote: z.string().optional(),
  businessOwnerName: z.string().min(1, "نام صاحب کسب و کار الزامی است"),
  businessOwnerRelation: z.string().optional(),
});
