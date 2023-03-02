import Head from 'next/head';
import { Heading, Text, Flex, Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { TextEditor } from '@/components/organisms';

const EditorContainer = styled.div`
  border-radius: 2px;
  max-width: 600px;
  position: relative;
  line-height: 20px;
  font-weight: 400;
  text-align: left;
  border: 1px solid #000;
`;

const EditorStyled = styled(TextEditor)`
  min-height: 150px;
  position: relative;
  tab-size: 1;
  outline: 0;
  padding: 1rem 0.5rem;
  width: 600px;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Title</title>
      </Head>
      <Flex direction={'column'} align={'center'} justify={'center'} height="100vh">
        <EditorContainer>
          <EditorStyled />
        </EditorContainer>
      </Flex>
    </>
  );
}
