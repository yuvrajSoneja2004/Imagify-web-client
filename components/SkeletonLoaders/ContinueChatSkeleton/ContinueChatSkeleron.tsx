'use client';
import React from 'react';
import S from './style.module.css';
import { Center, Image, Text, useComputedColorScheme } from '@mantine/core';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useColorScheme } from '@mantine/hooks';

type Props = {};

function ContinueChatSkeletion({}: Props) {
  const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  // 202020
  return (
    <SkeletonTheme baseColor={colorScheme == 'dark' ? '#202020' : '#fff'} highlightColor="#444">
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
