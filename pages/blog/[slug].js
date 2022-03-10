import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import { marked } from "marked";
// TODO: change import system? https://github.com/jonschlinkert/gray-matter#usage

const Post = ({ htmlString, data }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description}></meta>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
    </>
  );
};

export const getStaticPaths = async () => {
  // TODO: make this an async fn
  const files = fs.readdirSync("posts");
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const markdown = fs.readFileSync(path.join("posts", slug + ".md"), "utf8");
  const parsedMarkdown = matter(markdown);
  const htmlString = marked.parse(parsedMarkdown.content);

  return {
    props: {
      htmlString,
      data: parsedMarkdown.data,
    },
  };
};

export default Post;
