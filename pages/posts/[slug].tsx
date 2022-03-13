import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { postFilePaths, POSTS_PATH } from "../../lib/mdxUtils";
import MDXComponents from "../../components/mdx-components";
import BlogLayout from "../../components/layouts/post";
import IData from "../../interfaces/idata";
import readingTime from "reading-time";
import Layout from "../../components/layouts/article";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.

const Post = ({ source, data }) => {
  return (
    <BlogLayout data={data}>
      <MDXRemote {...source} components={MDXComponents} />
    </BlogLayout>
  );
};

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

  const enhancedData: IData = {
    author: data.author,
    publishedAt: data.publishedAt,
    title: data.title,
    summary: data.summary,
    readingTime: readingTime(content).text,
  };

  return {
    props: {
      source: mdxSource,
      data: enhancedData,
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

export default Post;
