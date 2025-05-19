import { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
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
      businesses: [
        {
          businessName: "",
          businessCategory: "",
          businessLink: "",
          businessWebsite: "",
          businessContactNumber: 0,
          businessAddress: "",
          businessNote: "",
          businessOwnerName: "",
          businessOwnerRelation: "",
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
            className="space-y-6"
          >
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="space-y-4 border p-4 rounded-lg relative"
              >
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
                    className="absolute top-2 left-2"
                  >
                    حذف
                  </Button>
                )}

                <FormField
                  control={step3Form.control}
                  name="businesses.0.businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نام کسب و کار</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: کافی‌شاپ آریا" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step3Form.control}
                  name="businesses.0.businessCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>دسته‌بندی کسب و کار</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: خوراک و نوشیدنی" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step3Form.control}
                  name="businesses.0.businessLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>لینک شبکه اجتماعی</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="مثال: instagram.com/aria_coffee"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step3Form.control}
                  name="businesses.0.businessWebsite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>وبسایت</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="مثال: www.aria-coffee.ir"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step3Form.control}
                  name="businesses.0.businessContactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>شماره تماس کسب و کار</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="مثال: 09121234567"
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step3Form.control}
                  name="businesses.0.businessAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>آدرس کسب و کار</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="مثال: تهران، خیابان ولیعصر، پلاک ۱۲۳"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step3Form.control}
                  name="businesses.0.businessNote"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>یادداشت (اختیاری)</FormLabel>
                      <FormControl>
                        <Input placeholder="توضیحات اضافی..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step3Form.control}
                  name="businesses.0.businessOwnerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نام صاحب کسب و کار</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: محمد رضایی" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step3Form.control}
                  name="businesses.0.businessOwnerRelation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نسبت با شما</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="مثال: برادر / خودم / همکار"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <Button
              type="button"
              onClick={() =>
                append({
                  businessName: "",
                  businessCategory: "",
                  businessLink: "",
                  businessWebsite: "",
                  businessContactNumber: 0,
                  businessAddress: "",
                  businessNote: "",
                  businessOwnerName: "",
                  businessOwnerRelation: "",
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
      )}
    </div>
  );
}
