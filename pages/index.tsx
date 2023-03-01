import Head from 'next/head';
import { Heading, Text, Flex, Box } from '@chakra-ui/react';

import { TextEditor } from '@/components/organisms';

export default function Home() {
  return (
    <>
      <Head>
        <title>Title</title>
      </Head>
      <Flex direction={'column'} justify={'center'} align={'center'} height="100vh">
        <Heading as="h1" size="2xl" role="heading" data-cy="main-title">
          Welcome
        </Heading>
        <Box>Compponent showcase</Box>
        <Box>TextEditor</Box>
        <Text as="i">Powered by Altos Labs</Text>
      </Flex>
    </>
  );
}
