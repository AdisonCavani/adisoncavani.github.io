const MDXComponents = {
  h1: (props) => <h1 {...props} />,
  h2: (props) => <h2 {...props} />,
  h3: (props) => <h3 {...props} />,
  h4: (props) => <h4 {...props} />,
  h5: (props) => <h5 {...props} />,
  h6: (props) => <h6 {...props} />,
  inlineCode: (props) => <div {...props} />,
  br: (props) => <div {...props} />,
  hr: (props) => <div></div>,
  a: (props) => <div></div>,
  p: (props) => <p {...props} />,
  ul: (props) => <div {...props} />,
  ol: (props) => <div {...props} />,
  li: (props) => <div {...props} />,
  blockquote: (props) => <p {...props} />,
};

export default MDXComponents;
