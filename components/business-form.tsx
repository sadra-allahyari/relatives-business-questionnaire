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
  businessCategoryOptions,
  businessOwnerRelationOptions,
} from "@/lib/constants";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ChevronDown } from "lucide-react";

interface BusinessFormProps {
  index: number;
  onRemove: () => void;
  canRemove: boolean;
}

/**
 * A form component for editing information about a single business.
 *
 * This component is designed to be used inside a react-hook-form context.
 * It manages a dynamic list of social media links for the business using
 * `useFieldArray`. The form includes fields for business details such as
 * name, category, website, contact number, address, notes, owner information,
 * and relationship with the user.
 *
 * @param {BusinessFormProps} props - The props for the component.
 * @param {number} props.index - The index of this business in the parent form's array.
 * @param {() => void} props.onRemove - Callback to remove this business from the form.
 * @param {boolean} props.canRemove - If true, shows a button to allow removing this business.
 * @returns {JSX.Element} The rendered business form component.
 */
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
    name: `businesses.${index}.business_link`,
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
        name={`businesses.${index}.business_name`}
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
            name={`businesses.${index}.business_link.${linkIndex}`}
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
        name={`businesses.${index}.business_website`}
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
        name={`businesses.${index}.business_number`}
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
        name={`businesses.${index}.business_address`}
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
        name={`businesses.${index}.business_note`}
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
        name={`businesses.${index}.business_owner_name`}
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
        name={`businesses.${index}.business_category`}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>دسته‌بندی کسب و کار</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {field.value ? field.value : "انتخاب دسته‌بندی"}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                align="start"
                className="w-full p-0 max-h-60 overflow-y-auto" // <== Added scrolling here
              >
                <Command>
                  <CommandInput
                    placeholder="جستجوی دسته‌بندی..."
                    className="h-9"
                  />
                  <CommandEmpty>دسته‌بندی‌ای یافت نشد.</CommandEmpty>
                  <CommandGroup>
                    {businessCategoryOptions.map((option) => (
                      <CommandItem
                        key={option}
                        value={option}
                        onSelect={() => field.onChange(option)}
                      >
                        {option}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`businesses.${index}.business_owner_relation`}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>نسبت با شما</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {field.value ? field.value : "انتخاب نسبت"}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                align="start"
                className="w-full p-0 max-h-60 overflow-y-auto"
              >
                <Command>
                  <CommandInput placeholder="جستجوی نسبت..." className="h-9" />
                  <CommandEmpty>نسبت یافت نشد.</CommandEmpty>
                  <CommandGroup>
                    {businessOwnerRelationOptions.map((option) => (
                      <CommandItem
                        key={option}
                        value={option}
                        onSelect={() => field.onChange(option)}
                      >
                        {option}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
