"use client";
import { createComment } from "@/lib/actions/comment.action";
import { commentSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

const Comment = ({
  postId,
  authorId,
  post,
}: {
  postId: string;
  authorId: string;
  post: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });
  const editorRef = useRef(null);
  const handleCreateComment = async (data: z.infer<typeof commentSchema>) => {
    try {
      setIsSubmitting(true);
      await createComment({
        content: data.comment,
        author: JSON.parse(authorId),
        post: JSON.parse(postId),
        path: pathname,
      });
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor && editor?.setContent("");
      }
      toast.success("Comment created successfully");
    } catch (error) {
      console.log("file: Comment.tsx:54 ~ handleCreateComment ~ error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <h3 className="font-bold text-lg mb-5">Write your comment</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateComment)}>
          <FormField
            control={form.control}
            name="comment"
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
                        skin: theme === "dark" ? "oxide-dark" : "oxide",
                        content_css: theme === "dark" ? "dark" : "light",
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
                        ],
                        toolbar:
                          "undo redo | " +
                          "codesample | bold italic forecolor | alignleft aligncenter |" +
                          "alignright alignjustify | bullist numlist",
                        content_style: `
                           body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; }`,
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              </>
            )}
          />
          <div className="mt-5"></div>
          <Button
            type="submit"
            className="text-white w-full p-3 font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting comment..." : "Post comment"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Comment;
