import { z } from "zod";
import { businessSchema } from "@/lib/hooks/validations";

export const step3Schema = z.object({
  businesses: z.array(businessSchema).min(1, "حداقل یک کسب و کار را وارد کنید"),
});
