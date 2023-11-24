import * as z from "zod";

const postSchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(10).max(10000),
  tags: z.array(z.string().min(3).max(20)).min(1).max(5),
  cover: z.string(),
});
const commentSchema = z.object({
  comment: z.string().min(5).max(1000),
});

export { commentSchema, postSchema };
