import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  businessCategoryOptions,
  businessOwnerRelationOptions,
} from "@/lib/hooks/constants";

interface BusinessFormProps {
  index: number;
  onRemove: () => void;
  canRemove: boolean;
}

export function BusinessForm({
  index,
  onRemove,
  canRemove,
}: BusinessFormProps) {
  const { control } = useFormContext();

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control,
    name: `businesses.${index}.businessLink`,
  });

  return (
    <div className="space-y-4 border p-4 rounded-lg relative">
      {canRemove && (
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={onRemove}
          className="absolute top-2 left-2"
        >
          حذف
        </Button>
      )}

      <FormField
        control={control}
        name={`businesses.${index}.businessName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>نام کسب و کار</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Social Media Links */}
      <div className="space-y-3">
        <FormLabel className="block">لینک‌های شبکه اجتماعی</FormLabel>
        {linkFields.map((linkField, linkIndex) => (
          <FormField
            key={linkField.id}
            control={control}
            name={`businesses.${index}.businessLink.${linkIndex}`}
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
                {linkFields.length > 1 && (
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeLink(linkIndex)}
                    className="absolute top-1/2 -translate-y-1/2 left-2 text-red-500"
                  >
                    ✕
                  </Button>
                )}
              </FormItem>
            )}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => appendLink("")}
        >
          + افزودن لینک جدید
        </Button>
      </div>

      {/* Other fields */}
      <FormField
        control={control}
        name={`businesses.${index}.businessWebsite`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>وبسایت</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`businesses.${index}.businessContactNumber`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>شماره تماس کسب و کار</FormLabel>
            <FormControl>
              <Input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={11}
                {...field}
                value={field.value}
                onChange={(e) => {
                  const digits = e.target.value
                    .replace(/[^0-9]/g, "")
                    .slice(0, 11);
                  field.onChange(digits);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`businesses.${index}.businessAddress`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>آدرس کسب و کار</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`businesses.${index}.businessNote`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>یادداشت</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`businesses.${index}.businessOwnerName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>نام صاحب کسب و کار</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`businesses.${index}.businessCategory`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>دسته‌بندی کسب و کار</FormLabel>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب دسته‌بندی" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.entries(businessCategoryOptions).map(
                  ([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`businesses.${index}.businessOwnerRelation`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>نسبت با شما</FormLabel>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب نسبت" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.entries(businessOwnerRelationOptions).map(
                  ([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
