import { JSX, useEffect, useState } from "react";
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
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { step1Schema, step3Schema } from "@/lib/validations";
import { BusinessForm } from "@/components/business-form";

type Step1Type = z.infer<typeof step1Schema>;
type Step3Type = z.infer<typeof step3Schema>;

/**
 * Multi-step form component for collecting user information and multiple business entries.
 *
 * The form proceeds through four steps:
 * - Step 0: Welcome message and start button.
 * - Step 1: Collect user's full name.
 * - Step 2: Instructions for adding business information.
 * - Step 3: Collect multiple business details with dynamic form fields.
 *
 * This component uses react-hook-form with zod validation schemas,
 * manages form state and submission, and prevents window/tab closure during submission.
 *
 * @return {JSX.Element} The rendered multi-step form.
 */
export default function StepForm(): JSX.Element {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Prevent closing or refreshing the page while form submission is in progress.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isSubmitting) {
        e.preventDefault();
        e.returnValue = ""; // required for some browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isSubmitting]);

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
          business_name: "",
          business_category: "نامشخص",
          business_link: [],
          business_website: "",
          business_number: "",
          business_address: "",
          business_note: "",
          business_owner_name: "",
          business_owner_relation: "نامشخص",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: step3Form.control,
    name: "businesses",
  });

  /**
   * Handler for submitting step 1 form.
   * Advances the step to 2.
   */
  const onSubmitStep1 = (): void => {
    setStep(2);
  };

  /**
   * Handler for submitting step 3 form.
   * Sends the combined form data to the server via POST request.
   *
   * @param data The business form data collected in step 3.
   */
  const onSubmitStep3: SubmitHandler<Step3Type> = async (data) => {
    setIsSubmitting(true);

    const formData = {
      ...step1Form.getValues(),
      ...data,
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("اطلاعات ثبت شد!");
      } else {
        toast.error("خطا در ذخیره اطلاعات");
      }
    } catch {
      toast.error("خطا در ارسال داده");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[400px] space-y-8">
      {step === 0 && (
        <div className="space-y-6 text-center">
          <p className="text-muted-foreground">
            سلام!
            <br />
            این پرسشنامه با هدف معرفی کسب و کارهایی که ما در خانواده یا اقوام
            خودمون داریم به همدیگه طراحی شده است. لطفا برای تقویت شبکه سازی شروع
            رو بزن.
          </p>
          <Button onClick={() => setStep(1)} className="w-full">
            شروع
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
                    business_name: "",
                    business_category: "نامشخص",
                    business_link: [],
                    business_website: "",
                    business_number: "",
                    business_address: "",
                    business_note: "",
                    business_owner_name: "",
                    business_owner_relation: "نامشخص",
                  })
                }
                className="w-full"
                disabled={isSubmitting}
              >
                افزودن کسب‌وکار جدید
              </Button>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "در حال ارسال..." : "ارسال نهایی"}
              </Button>
            </form>
          </Form>
        </FormProvider>
      )}
    </div>
  );
}
