import NextLink from "next/link";
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button,
} from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Container>
      <Heading as="h1">404 | Not Found</Heading>
      <Text>The page you&apos;re looking for was not found.</Text>
      <Divider my={6} />

      <Box my={6} textAlign="center">
        <NextLink href="/" passHref>
          <Button colorScheme="teal">Return to home</Button>
        </NextLink>
      </Box>
    </Container>
  );
};

export default NotFound;
