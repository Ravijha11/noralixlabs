declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const meta: {
    title: string;
    excerpt: string;
    date: string;
    keyword: string;
    readingTimeMinutes?: number;
  };

  const MDXComponent: ComponentType;
  export default MDXComponent;
}

