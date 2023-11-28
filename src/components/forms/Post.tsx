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
import { CreateTopicParams } from "@/lib/actions/shared.types";
import { postSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import TagItem from "../shared/TagItem";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function Post({
  userId,
  topics,
}: {
  userId: string;
  topics: CreateTopicParams[] | undefined;
}) {
  const { theme } = useTheme();
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      topic: "",
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
        author: JSON.parse(userId),
        topic: JSON.parse(values.topic),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }
  // const handleInputKeyDown = (
  //   e: React.KeyboardEvent<HTMLInputElement>,
  //   field: any
  // ) => {
  //   if (e.key === "Enter" && field.name === "tags") {
  //     e.preventDefault();
  //     const tagInput = e.target as HTMLInputElement;
  //     const tagValue = tagInput.value.trim();
  //     if (tagValue) {
  //       if (tagValue.length > 20) {
  //         return form.setError("tags", {
  //           type: "max",
  //           message: "Tag length must be less than 20 characters",
  //         });
  //       }
  //       if (!field.value.includes(tagValue)) {
  //         form.setValue("tags", [...field.value, tagValue]);
  //         tagInput.value = "";
  //         form.clearErrors("tags");
  //       }
  //     } else {
  //       form.trigger();
  //     }
  //   }
  // };
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
                      placeholder="New discussion title..."
                      className="no-focus p-4 h-auto font-semibold text-lg"
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
            name="topic"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="h-12">
                        <div className="line-clamp-1 flex-1 text-left">
                          <SelectValue placeholder="Select a topic" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          {topics &&
                            topics.map((topic) => (
                              <SelectItem
                                className="hover:bg-gray-100"
                                key={topic.name}
                                value={JSON.stringify(topic._id!)}
                              >
                                {topic.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                        height: 250,
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
                           body { font-family: DM sans, Inter,Helvetica,Arial,sans-serif; font-size:14px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; }`,
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              </>
            )}
          />
          {/* <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel className="text-secondary-color-2 text-sm font-semibold dark:text-white">
                    Tags
                  </FormLabel>
                  <FormControl>
                    <>
                      <Input
                        placeholder="Add a tag..."
                        className="h-12 py-3 px-5 text-sm leading-normal dark:border-dark4 bg-transparent no-focus"
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
          /> */}
          <div className="flex items-center gap-5">
            <Button
              type="submit"
              className="text-white font-semibold disabled:opacity-50"
              disabled={isSubmitting}
            >
              Post new discussion
            </Button>
            <Button
              variant="ghost"
              type="reset"
              className="font-medium text-secondary-color-3 p-0"
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
