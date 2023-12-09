'use client';
import { Avatar, Box, Flex, Grid, Text } from '@mantine/core';
import { IconBrandHipchat, IconUserCog } from '@tabler/icons-react';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SearchSkeletion = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Grid align={'center'} h={100} justify={'center'}>
        {/* 1  */}
        <Grid.Col span={1}>
          <Avatar size={60}>
            <Skeleton width={65} height={65} />
          </Avatar>
        </Grid.Col>
        {/* 2  */}
        <Grid.Col span={10.5}>
          <Box m={0}>
            <Text fw={'bold'}>
              <Skeleton />
            </Text>
            <Text fw={100}>
              {' '}
              <Skeleton />
            </Text>
            <Flex align={'center'} gap={3}>
              <Skeleton width={43} height={20} />
            </Flex>
          </Box>
        </Grid.Col>
        {/* 3  */}
        <Grid.Col span={0.5}></Grid.Col>
      </Grid>
    </SkeletonTheme>
  );
};

export default SearchSkeletion;
