import { z } from "zod";

export const step1Schema = z.object({
  name: z.string().min(1, "نام و نام خانوادگی الزامی است"),
});
