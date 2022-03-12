import { Global } from "@emotion/react";

// TODO: add loading in deferred mode (add to head)
const Fonts = () => (
  <Global
    styles={`@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;700&display=swap');`}
  />
);

export default Fonts;
