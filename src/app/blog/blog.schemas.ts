import { z } from 'zod';

export const BlogSchema = z.object({
  author: z.string(),
  comments: z.number(),
  contentPreview: z.string(),
  createdByMe: z.boolean(),
  id: z.number(),
  likedByMe: z.boolean(),
  likes: z.number(),
  title: z.string()
});

export const BlogEntriesResponseSchema = z.object({
  data: z.array(BlogSchema)
});

// Aliases
export { BlogSchema as BlogEntrySchema };
export { BlogEntriesResponseSchema as BlogListResponseSchema };

// Types
export type Blog = z.infer<typeof BlogSchema>;
export type BlogEntriesResponse = z.infer<typeof BlogEntriesResponseSchema>;
export type BlogListResponse = BlogEntriesResponse;


