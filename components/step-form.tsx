import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const step1Schema = z.object({
  firstName: z.string().min(1, "نام الزامی است"),
  lastName: z.string().min(1, "نام خانوادگی الزامی است"),
});

const step3Schema = z.object({
  phone: z.string().optional(),
  address: z.string().optional(),
});

type Step1Type = z.infer<typeof step1Schema>;
type Step3Type = z.infer<typeof step3Schema>;

export default function StepForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const step1Form = useForm<Step1Type>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const step3Form = useForm<Step3Type>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      phone: "",
      address: "",
    },
  });

  const onSubmitStep1 = () => {
    setStep(2);
  };

  const onSubmitStep3 = (data: Step3Type) => {
    alert("اطلاعات ثبت شد!");
    console.log({
      ...step1Form.getValues(),
      ...data,
    });
  };

  return (
    <div className="w-[400px]">
      {step === 1 && (
        <Form {...step1Form}>
          <form
            onSubmit={step1Form.handleSubmit(onSubmitStep1)}
            className="space-y-4"
          >
            <FormField
              control={step1Form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input placeholder="نام" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={step1Form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام خانوادگی</FormLabel>
                  <FormControl>
                    <Input placeholder="نام خانوادگی" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              ادامه
            </Button>
          </form>
        </Form>
      )}

      {step === 2 && (
        <div className="space-y-6 text-center">
          <p className="text-muted-foreground">
            حالا وارد بخش اطلاعات تماس می‌شوید. لطفاً اطلاعات تماس خود را وارد
            کنید.
          </p>
          <Button onClick={() => setStep(3)} className="w-full">
            رفتن به فرم تماس
          </Button>
        </div>
      )}

      {step === 3 && (
        <Form {...step3Form}>
          <form
            onSubmit={step3Form.handleSubmit(onSubmitStep3)}
            className="space-y-4"
          >
            <FormField
              control={step3Form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره تماس</FormLabel>
                  <FormControl>
                    <Input placeholder="شماره تماس" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={step3Form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>آدرس</FormLabel>
                  <FormControl>
                    <Input placeholder="آدرس" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              ارسال
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
