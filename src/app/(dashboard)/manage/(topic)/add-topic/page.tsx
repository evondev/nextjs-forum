"use client";
import HeadingDashboard from "@/components/shared/HeadingDashboard";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createTopic } from "@/lib/actions/topic.action";
import { newTopicSchema } from "@/lib/validations";
import { UploadButton } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const AddTopic = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof newTopicSchema>>({
    resolver: zodResolver(newTopicSchema),
    defaultValues: {},
  });
  async function onSubmit(values: z.infer<typeof newTopicSchema>) {
    try {
      setIsSubmitting(true);
      await createTopic({
        ...values,
        value: values?.value?.toLowerCase() || values.name.toLowerCase(),
      });
      toast.success("Topic created successfully");
      form.reset();
    } catch (error) {
      console.log("file: page.tsx:40 ~ onSubmit ~ error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }
  const icon = useWatch({
    control: form.control,
    name: "icon",
  });
  return (
    <div>
      <HeadingDashboard>Add new topic</HeadingDashboard>
      <div className="w-full max-w-2xl mx-auto bg-white p-10 rounded">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Category name"
                      className="no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Category value"
                      className="no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <>
                      {icon && (
                        <Image
                          width={40}
                          height={40}
                          src={icon}
                          className="w-10 h-10 rounded-full"
                          alt="icon"
                        />
                      )}
                      {!icon && (
                        <UploadButton
                          className="justify-start items-start"
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            // Do something with the response
                            form.setValue("icon", res[0].url);
                          }}
                          onUploadError={(error: Error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                          }}
                        />
                      )}
                    </>
                  </FormControl>
                  <FormDescription className="text-sm text-slate-500">
                    Should be .PNG for better experience
                  </FormDescription>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Category description"
                      className="no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="text-white font-medium  w-[120px]"
              >
                {isSubmitting ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddTopic;
