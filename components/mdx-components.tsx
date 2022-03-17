const MDXComponents = {
  h1: (props) => <h1 as="h1" size="xl" my={4} {...props} />,
  h2: (props) => <h2 as="h2" size="lg" fontWeight="bold" {...props} />,
  h3: (props) => <h3 as="h3" size="md" fontWeight="bold" {...props} />,
  h4: (props) => <h4 as="h4" size="sm" fontWeight="bold" {...props} />,
  h5: (props) => <h5 as="h5" size="sm" fontWeight="bold" {...props} />,
  h6: (props) => <h6 as="h6" size="xs" fontWeight="bold" {...props} />,
  inlineCode: (props) => (
    <div colorScheme="yellow" fontSize="0.84em" {...props} />
  ),
  br: (props) => <div height="24px" {...props} />,
  hr: (props) => <div></div>,
  a: (props) => <div></div>,
  p: (props) => <p {...props} />,
  ul: (props) => <div as="ul" pt={2} pl={4} ml={2} {...props} />,
  ol: (props) => <div as="ol" pt={2} pl={4} ml={2} {...props} />,
  li: (props) => <div as="li" pb={1} {...props} />,
  blockquote: (props) => <p {...props} />,
};

export default MDXComponents;
