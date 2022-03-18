import PostProps from "@interfaces/post-props";

const PostLayout = ({ children, frontMatter }: { children: any, frontMatter: PostProps }) => {
    return (
        <>
            {children}
        </>
    )
}

export default PostLayout;