import * as z from "zod";

const postSchema = z.object({
  title: z.string().min(5).max(1000),
  content: z.string().min(10).max(10000),
  topic: z.string().min(1),
});
const commentSchema = z.object({
  comment: z.string().min(5).max(1000),
});

export { commentSchema, postSchema };
