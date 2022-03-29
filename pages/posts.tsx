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
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import BlogPost from "@components/post";
import { getAllFilesFrontMatter } from "@lib/mdxUtils";
import Section from "@components/section";
import { SortingMethods } from "@interfaces/sorting-methods";

export default function Blog({ posts }) {
  const [searchValue, setSearchValue] = useState("");
  const [sortingMethod, setSortingMethod] = useState(
    SortingMethods.Date.toString()
  );

  // TODO: improve search algorithm
  // TODO: fix this junk...
  const filteredBlogPosts = posts
    .sort((a, b) => {
      if (sortingMethod === SortingMethods.Az.toString())
        return a.title.localeCompare(b.title);
      else if (sortingMethod === SortingMethods.Date.toString())
        return (
          Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
        );
      else if (sortingMethod === SortingMethods.Rel.toString())
        return (
          Number(new Date(a.publishedAt)) - Number(new Date(b.publishedAt)) // TODO: add relevance algo
        );
    })
    .filter(
      (frontMatter) =>
        frontMatter.title?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
        frontMatter.summary?.toLowerCase()?.includes(searchValue.toLowerCase())
    );

  return (
    <>
      <Head>
        <title>Blog - Adison Cavani</title>
      </Head>
      <Stack>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Section>
            <Heading letterSpacing="tight" mb={4} as="h1" size="2xl">
              All Posts
            </Heading>
          </Section>
          <Box w="100%">
            <Section delay="0.1">
              <InputGroup mb={4} mr={4}>
                <InputLeftAddon ps={0} pe={0}>
                  <Menu>
                    <MenuButton pl={4} pr={3}>
                      Filters
                      <ChevronDownIcon ml={3} />
                    </MenuButton>
                    <MenuList mt={2}>
                      <MenuOptionGroup
                        defaultValue={SortingMethods.Date.toString()}
                      >
                        <MenuItemOption
                          value={SortingMethods.Az.toString()}
                          onClick={() =>
                            setSortingMethod(SortingMethods.Az.toString())
                          }
                        >
                          A-Z
                        </MenuItemOption>
                        <MenuItemOption
                          value={SortingMethods.Date.toString()}
                          onClick={() =>
                            setSortingMethod(SortingMethods.Date.toString())
                          }
                        >
                          Date
                        </MenuItemOption>
                        <MenuItemOption
                          value={SortingMethods.Rel.toString()}
                          onClick={() =>
                            setSortingMethod(SortingMethods.Rel.toString())
                          }
                        >
                          Relevance
                        </MenuItemOption>
                      </MenuOptionGroup>
                    </MenuList>
                  </Menu>
                </InputLeftAddon>
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
          <Section delay=".1">
            {filteredBlogPosts.map((frontMatter) => (
              <BlogPost key={frontMatter.title} {...frontMatter} />
            ))}
            {!filteredBlogPosts.length && <NoPostFound />}
          </Section>
        </Flex>
      </Stack>
    </>
  );
}

const NoPostFound = () => {
  return (
    <Stack>
      <Heading>Oops!</Heading>
      <Text>No post found</Text>
    </Stack>
  );
};

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter();
  return { props: { posts } };
}
