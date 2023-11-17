"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createPost } from "@/lib/actions/post.action";
import { postSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

function Post({ userId }: { userId: string }) {
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  async function onSubmit(values: z.infer<typeof postSchema>) {
    setIsSubmitting(true);
    try {
      await createPost({
        title: values.title,
        content: values.content,
        tags: values.tags,
        author: JSON.parse(userId),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      if (tagValue) {
        if (tagValue.length > 20) {
          return form.setError("tags", {
            type: "max",
            message: "Tag length must be less than 20 characters",
          });
        }
        if (!field.value.includes(tagValue)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };
  return (
    <div className="bg-white dark:bg-dark3 max-w-[900px] mx-auto p-8 rounded-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Title..."
                      className="py-3 px-5 bg-secondary-color-bg-2 font-bold text-2xl rounded-lg leading-normal h-auto dark:bg-dark4 dark:text-white focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormControl>
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                      // @ts-ignore
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue="<p>This is the initial content of the editor.</p>"
                      onBlur={field.onBlur}
                      onEditorChange={(content) => field.onChange(content)}
                      init={{
                        skin: window.matchMedia("(prefers-color-scheme: dark)")
                          .matches
                          ? "oxide-dark"
                          : "oxide",
                        content_css: window.matchMedia(
                          "(prefers-color-scheme: dark)"
                        ).matches
                          ? "dark"
                          : "default",
                        height: 500,
                        menubar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | " +
                          "bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style: `
                           body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px; }`,
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel className="text-secondary-color-2 text-sm font-semibold dark:text-white">
                    Add or change tags (up to 5) so readers know what your story
                    is about
                  </FormLabel>
                  <FormControl>
                    <>
                      <Input
                        placeholder="Add a tag..."
                        className="h-auto py-3 px-5 text-sm leading-normal dark:border-dark4 bg-transparent"
                        onKeyDown={(e) => handleInputKeyDown(e, field)}
                      />
                      {field.value.length > 0 && (
                        <div className="flex gap-2">
                          {field.value.map((tag) => (
                            <div key={tag}>
                              <Badge>{tag}</Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  </FormControl>

                  <FormMessage className="text-red-400" />
                </FormItem>
              </>
            )}
          />
          <div className="flex items-center gap-5">
            <Button
              type="submit"
              className="py-2.5 px-10 bg-secondary rounded-lg text-white text-base disabled:opacity-50"
              disabled={isSubmitting}
            >
              Submit
            </Button>
            <Button
              variant="ghost"
              type="reset"
              className="font-normal text-base text-secondary-color-3 p-0"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Post;
