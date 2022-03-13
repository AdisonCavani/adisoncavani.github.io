import fs from "fs";
import path from "path";
import matter from "gray-matter";

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), "posts");

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export async function getAllFilesFrontMatter(dir: string = "posts") {
  const root = process.cwd();
  const files = fs.readdirSync(path.join(root, dir));

  return files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(path.join(root, dir, postSlug), "utf8");
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace(".mdx", ""),
      },
      ...allPosts,
    ];
  }, [] as object[]);
}
