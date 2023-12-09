'use client';
import React from 'react';
import S from './style.module.css';
import { Center, Image, Text } from '@mantine/core';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

type Props = {};

function ContinueChatSkeletion({}: Props) {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className={S.card}>
        <Skeleton width={'100%'} height={'100%'} />
        <Text>
          <Center>
            <Skeleton width={100} height={10} />
          </Center>
        </Text>
      </div>
    </SkeletonTheme>
  );
}

export default ContinueChatSkeletion;
