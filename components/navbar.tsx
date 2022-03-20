import styles from "@styles/navbar.module.css";
import NextLink from "next/link";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <div></div>
      <NextLink href="/posts" passHref>
        <button />
      </NextLink>
    </nav>
  );
};

export default Navbar;
