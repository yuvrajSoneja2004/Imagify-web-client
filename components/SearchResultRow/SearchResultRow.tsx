'use client';
import React from 'react';
import S from './SearchResultRow.module.css';
import { Avatar, Box, Flex, Grid, Stack, Text } from '@mantine/core';
import { IconBrandHipchat, IconBrandWechat, IconUserCog } from '@tabler/icons-react';

type Props = {};

function SearchResultRow({}: Props) {
  return (
    <Grid align={'center'} h={100} justify={'center'}>
      {/* 1  */}
      <Grid.Col span={1}>
        <Avatar
          src={`https://characterai.io/i/80/static/avatars/uploaded/2022/10/15/HNmAcIWe_6SkxcPo43HbcpaOfU_vACsOqpIv0iNyvjc.webp`}
          size={60}
        />
      </Grid.Col>
      {/* 2  */}
      <Grid.Col span={10.5}>
        <Box m={0}>
          <Text fw={'bold'}>Power</Text>
          <Text fw={100}>Lorem ipsum dolor sit amet?</Text>
          <Flex align={'center'} gap={3}>
            <IconBrandHipchat size={15} />
            <Text fz={14} fw={600}>
              12m
            </Text>
          </Flex>
        </Box>
      </Grid.Col>
      {/* 3  */}
      <Grid.Col span={0.5}>
        <Flex>
          <IconUserCog />
        </Flex>
      </Grid.Col>
    </Grid>
  );
}
// {/* <Flex align={'center'} h={100} style={{ border: '2px solid red' }} justify={'space-around'}>
//       {/* 1  */}
//       <Avatar
//         src={`https://characterai.io/i/80/static/avatars/uploaded/2022/10/15/HNmAcIWe_6SkxcPo43HbcpaOfU_vACsOqpIv0iNyvjc.webp`}
//         size={60}
//       />
//       {/* 2  */}
//       <Box m={0}>
//         <Text>Power</Text>
//         <Text>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem vitae repellat nemo?
//         </Text>
//         <Flex>
//           <IconBrandWechat />
//         </Flex>
//       </Box>
//       {/* 3  */}
//       <Flex>
//         <IconUserCog />
//       </Flex>
//     </Flex> */}
export default SearchResultRow;
