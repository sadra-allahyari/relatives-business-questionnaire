import { useState } from "react";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { step1Schema, step3Schema } from "@/lib/hooks/validations";
import { BusinessForm } from "./business-form";

type Step1Type = z.infer<typeof step1Schema>;
type Step3Type = z.infer<typeof step3Schema>;

export default function StepForm() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  const step1Form = useForm<Step1Type>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: "",
    },
  });

  const step3Form = useForm<Step3Type>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      businesses: [
        {
          businessName: "",
          businessCategory: "0",
          businessLink: [""],
          businessWebsite: "",
          businessContactNumber: "",
          businessAddress: "",
          businessNote: "",
          businessOwnerName: "",
          businessOwnerRelation: "0",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: step3Form.control,
    name: "businesses",
  });

  const onSubmitStep1 = () => {
    setStep(2);
  };

  const onSubmitStep3: SubmitHandler<Step3Type> = (data) => {
    alert("اطلاعات ثبت شد!");
    console.log({
      ...step1Form.getValues(),
      ...data,
    });
  };

  return (
    <div className="w-[400px] space-y-8">
      {step === 0 && (
        <div className="space-y-6 text-center">
          <p className="text-muted-foreground">
            در ادامه، اطلاعات کسب و کارها ازتون خواسته شده است، اگر بیش از یک
            کسب و کار در اطرافیانتون دارید، با کلیک بر روی دکمه افزودن کسب و کار
            جدید اضافه کنید.
          </p>
          <Button onClick={() => setStep(1)} className="w-full">
            متوجه شدم
          </Button>
        </div>
      )}

      {step === 1 && (
        <Form {...step1Form}>
          <form
            onSubmit={step1Form.handleSubmit(onSubmitStep1)}
            className="space-y-4"
          >
            <FormField
              control={step1Form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام و نام خانوادگی</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
            در ادامه، اطلاعات کسب و کارها ازتون خواسته شده است، اگر بیش از یک
            کسب و کار در اطرافیانتون دارید، با کلیک بر روی دکمه افزودن کسب و کار
            جدید اضافه کنید.
          </p>
          <Button onClick={() => setStep(3)} className="w-full">
            متوجه شدم
          </Button>
        </div>
      )}

      {step === 3 && (
        <FormProvider {...step3Form}>
          <Form {...step3Form}>
            <form
              onSubmit={step3Form.handleSubmit(onSubmitStep3)}
              className="space-y-6"
            >
              {fields.map((field, index) => (
                <BusinessForm
                  key={field.id}
                  index={index}
                  onRemove={() => remove(index)}
                  canRemove={fields.length > 1}
                />
              ))}

              <Button
                type="button"
                onClick={() =>
                  append({
                    businessName: "",
                    businessCategory: "0",
                    businessLink: [""],
                    businessWebsite: "",
                    businessContactNumber: "",
                    businessAddress: "",
                    businessNote: "",
                    businessOwnerName: "",
                    businessOwnerRelation: "0",
                  })
                }
                className="w-full"
              >
                افزودن کسب‌وکار جدید
              </Button>

              <Button type="submit" className="w-full">
                ارسال نهایی
              </Button>
            </form>
          </Form>
        </FormProvider>
      )}
    </div>
  );
}
