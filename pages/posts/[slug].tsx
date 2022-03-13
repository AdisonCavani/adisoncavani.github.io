import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import CustomLink from "../../components/custom-link";
import { postFilePaths, POSTS_PATH } from "../../lib/mdxUtils";
import Layout from "../../components/layout";
import Link from "next/link";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  TestComponent: dynamic(() => import("../../components/test-component")),
  Head,
};

const Post = ({ source, frontMatter }) => {
  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        <meta name="description" content={frontMatter.description}></meta>
      </Head>
      <Layout>
        <header>
          <nav>
            <Link href="/">
              <a>👈 Go back home</a>
            </Link>
          </nav>
        </header>
        <div className="post-header">
          <h1>{frontMatter.title}</h1>
          {frontMatter.description && (
            <p className="description">{frontMatter.description}</p>
          )}
        </div>
        <main>
          <MDXRemote {...source} components={components} />
        </main>

        <style jsx>{`
          .post-header h1 {
            margin-bottom: 0;
          }
          .post-header {
            margin-bottom: 2rem;
          }
          .description {
            opacity: 0.6;
          }
        `}</style>
      </Layout>
    </>
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

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
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
