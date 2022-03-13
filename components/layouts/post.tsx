import React from "react";
import Head from "next/head";
import { parseISO, format } from "date-fns";
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Avatar,
  Box,
} from "@chakra-ui/react";
import IData from "../../interfaces/idata";
import { motion } from "framer-motion";

export default function BlogLayout({ children, data }) {
  const { colorMode } = useColorMode();
  const textColor = {
    light: "gray.700",
    dark: "gray.400",
  };

  const variants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -0, y: 20 },
  };

  return (
    <motion.article
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: "easeInOut" }}
      style={{ position: "relative" }}
    >
      <Box>
        <Head>
          <title>{data.title} - AdisonCavani</title>
          <meta name="description" content={data.description}></meta>
        </Head>
        <Stack
          as="article"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto 4rem auto"
          w="100%"
          px={2}
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            w="100%"
          >
            <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
              {data.title}
            </Heading>
            <Flex
              justify="space-between"
              align={["initial", "center"]}
              direction={["column", "row"]}
              mt={2}
              w="100%"
              mb={4}
            >
              <Flex align="center">
                <Avatar size="xs" name={data.author} mr={2} />
                <Text fontSize="sm" color={textColor[colorMode]}>
                  {data.author} /{" "}
                  {format(parseISO(data.publishedAt), "MMMM dd, yyyy")}
                </Text>
              </Flex>
              <Text fontSize="sm" color="gray.500" minWidth="100px" mt={[2, 0]}>
                {data.readingTime}
              </Text>
            </Flex>
          </Flex>
          {children}
        </Stack>
      </Box>
    </motion.article>
  );
}

export { getServerSideProps } from "../../components/chakra";
