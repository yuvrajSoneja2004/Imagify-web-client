'use client';
import React from 'react';
import S from './SearchResultRow.module.css';
import { Avatar, Box, Flex, Grid, Stack, Text } from '@mantine/core';
import { IconBrandHipchat, IconBrandWechat, IconUserCog } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

type Props = {
  info: any;
};

function SearchResultRow({ info }: Props) {
  const { _id, avatar, name, views, greeting } = info;

  const navigate = useRouter();
  console.log(info, 'this is the info');
  return (
    <Grid
      align={'center'}
      h={100}
      justify={'center'}
      style={{ cursor: 'pointer' }}
      onClick={() => {
        navigate.push(`/chat?id=${_id}`);
      }}
    >
      {/* 1  */}
      <Grid.Col span={1}>
        <Avatar src={avatar} size={60} />
      </Grid.Col>
      {/* 2  */}
      <Grid.Col span={10.5}>
        <Box m={0}>
          <Text fw={'bold'}>{name}</Text>
          <Text fw={100}>{greeting}</Text>
          <Flex align={'center'} gap={3}>
            <IconBrandHipchat size={15} />
            <Text fz={14} fw={600}>
              {views.length}
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
