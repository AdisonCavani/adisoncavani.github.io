import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { postFilePaths, POSTS_PATH } from "@lib/mdxUtils";
import MDXComponents from "@components/mdx-components";
import PostLayout from "@components/layouts/post-layout";
import PostProps from "@interfaces/post-props";
import readingTime from "reading-time";

export default function PostPage({
  source,
  frontMatter,
}: {
  source: any;
  frontMatter: PostProps;
}) {
  return (
    <PostLayout frontMatter={frontMatter}>
      <MDXRemote {...source} components={MDXComponents} />
    </PostLayout>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: {
        author: data.author,
        publishedAt: data.publishedAt,
        title: data.title,
        summary: data.summary,
        readingTime: readingTime(content).text,
        slug: params.slug,
        tags: "",
      },
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
