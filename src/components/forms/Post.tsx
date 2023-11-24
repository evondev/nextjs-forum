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
import { UploadDropzone } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import TagItem from "../shared/TagItem";
import { Button } from "../ui/button";

function Post({ userId }: { userId: string }) {
  const { theme } = useTheme();
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      cover: "https://source.unsplash.com/random",
    },
  });
  const cover = form.watch("cover");
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
        cover:
          JSON.parse(userId) === process.env.ADMIN_ID
            ? values.cover
            : undefined,
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
                      className="py-3 px-5 bg-secondary-color-bg-2 font-bold text-2xl rounded-lg leading-normal h-auto dark:bg-dark4 dark:text-white focus-visible:ring-0 no-focus dark:border-dark4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              </>
            )}
          />
          {!cover && (
            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormControl>
                      <UploadDropzone
                        endpoint="imageUploader"
                        className="dark:bg-dark4 dark:text-white"
                        onClientUploadComplete={(res) => {
                          if (res.length) {
                            form.setValue("cover", res[0].url);
                          }
                        }}
                        onUploadError={(error: Error) => {
                          toast.error(`ERROR! ${error.message}`);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                </>
              )}
            />
          )}
          {cover && (
            <div className="relative h-80">
              <button
                className="w-12 h-12 rounded-full absolute top-2/4 left-2/4 z-10 bg-white flex items-center justify-center hover:text-red-500"
                onClick={() => form.setValue("cover", "")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
              <Image
                alt=""
                src={cover}
                fill
                className="w-full h-full object-cover rounded-lg"
              ></Image>
            </div>
          )}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormControl className="post-content">
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                      // @ts-ignore
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue="<p>This is the initial content of the editor.</p>"
                      onBlur={field.onBlur}
                      onEditorChange={(content) => field.onChange(content)}
                      init={{
                        skin: theme === "dark" ? "oxide-dark" : "oxide",
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
                          "codesample",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "heading",
                        ],
                        toolbar:
                          "undo redo | " +
                          "codesample | bold italic forecolor | alignleft aligncenter |" +
                          "alignright alignjustify | bullist numlist |" +
                          "image |" +
                          "h1 h2 h3 h4 h5 h6 | preview | fullscreen |" +
                          "link",
                        content_style: `
                           body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; }`,
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
                        className="h-auto py-3 px-5 text-sm leading-normal dark:border-dark4 bg-transparent no-focus"
                        onKeyDown={(e) => handleInputKeyDown(e, field)}
                      />
                      {field.value.length > 0 && (
                        <div className="flex gap-2">
                          {field.value.map((tag) => (
                            <div key={tag}>
                              <TagItem name={tag}></TagItem>
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
              className="py-2.5 px-10 rounded-lg text-white text-base disabled:opacity-50"
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
