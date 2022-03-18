import PostProps from "@interfaces/post-props";

const PostLayout = ({
  children,
  frontMatter,
}: {
  children: any;
  frontMatter: PostProps;
}) => {
  return (
    <>
      {children}
      <div>
        <a
          href={`${process.env.githubRepo}/edit/${process.env.githubBranch}/posts/${frontMatter.slug}.mdx`}
          target="_blank"
          rel="noreferrer"
        >
          {"Edit on Github"}
        </a>
      </div>
    </>
  );
};

export default PostLayout;
