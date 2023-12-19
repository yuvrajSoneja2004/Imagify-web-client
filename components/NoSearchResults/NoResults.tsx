import { Center, Flex, Stack, Title } from '@mantine/core';
import React from 'react';
import P from '../../assets/no-results.png';

interface Props {
  title: string;
  imgsrc: string;
}
function NoResults({ title, imgsrc }: Props) {
  return (
    <Center h={'80vh'}>
      <Flex align={'center'} justify={'center'} direction={'column'} gap={30}>
        <img src={imgsrc} alt="not-found" width={270} height={270} />
        <Title>{title}</Title>
      </Flex>
    </Center>
  );
}

export default NoResults;
