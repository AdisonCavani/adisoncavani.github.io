import React, { useState } from "react";
import Head from "next/head";
import {
  Heading,
  Flex,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Box,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import BlogPost from "@components/blog-post";
import { getAllFilesFrontMatter } from "@lib/mdxUtils";
import Section from "@components/section";

export default function Blog({ posts }) {
  const [searchValue, setSearchValue] = useState("");

  // TODO: improve search algorithm
  const filteredBlogPosts = posts
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .filter(
      (frontMatter) =>
        frontMatter.title?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
        frontMatter.summary?.toLowerCase()?.includes(searchValue.toLowerCase())
    );

  return (
    <>
      <Head>
        <title>Blog - Benjamin Carlson</title>
      </Head>
      <Stack>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Section>
            <Heading letterSpacing="tight" mb={4} as="h1" size="2xl">
              Blog
            </Heading>
          </Section>
          <Section delay="0.1">
            <Text>
              I&apos;ve been writing online since 2014, mostly about web
              development and tech careers. In total, I&apos;ve written 68
              articles on my blog. Use the search below to filter by title.
            </Text>
          </Section>
          <Box w="100%">
            <Section delay="0.2">
              <InputGroup mb={4} mr={4}>
                <Input
                  aria-label="Search articles"
                  placeholder="Search articles"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <InputRightElement>
                  <SearchIcon color="gray.300" />
                </InputRightElement>
              </InputGroup>
            </Section>
          </Box>
          <Section delay="0.3">
            {!filteredBlogPosts.length && "No posts found."}
            {filteredBlogPosts.map((frontMatter) => (
              <BlogPost key={frontMatter.title} {...frontMatter} />
            ))}
          </Section>
        </Flex>
      </Stack>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter();
  return { props: { posts } };
}
