import * as z from "zod";

const postSchema = z.object({
  title: z.string().min(5).max(1000),
  content: z.string().min(10).max(10000),
  topic: z.string().min(1),
  desc: z.string().min(5).max(1000),
});
const commentSchema = z.object({
  comment: z.string().min(5).max(1000),
});
const updateProfileSchema = z.object({
  name: z.string().min(5).max(100).optional(),
  bio: z.string().max(100).optional(),
  website: z.string().max(100).optional(),
  socials: z.object({
    facebook: z.string().max(100).optional(),
    twitter: z.string().max(100).optional(),
    instagram: z.string().max(100).optional(),
    youtube: z.string().max(100).optional(),
  }),
});

export { commentSchema, postSchema, updateProfileSchema };
