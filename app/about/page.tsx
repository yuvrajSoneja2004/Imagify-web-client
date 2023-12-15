'use client';
import { Avatar, Box, Center, Flex, Text, Title, em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandReddit,
  IconBrandTwitter,
  IconQuestionMark,
  IconUser,
} from '@tabler/icons-react';
import React from 'react';

function page() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <Center h={'100vh'} p={30}>
      <Flex
        align={'center'}
        justify={'center'}
        w={'100%'}
        gap={40}
        direction={isMobile ? 'column' : 'row'}
        mt={isMobile ? 100 : 0}
      >
        <Box>
          <Avatar src="./about.jpg" alt="" size={400} />
        </Box>
        <Box w={700}>
          <Flex align={'center'} gap={20}>
            <Center w={60} h={60} bg={'#2C3C49'} style={{ borderRadius: '7px' }}>
              <IconQuestionMark size={80} color={'#74C0FC'} />
            </Center>
            <Title size={60} fw={'bold'}>
              About
            </Title>
          </Flex>
          <Text mt={10}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id soluta fugit, veniam rerum
            consequuntur quisquam? Repudiandae similique repellat amet perferendis minus. Illo
            itaque quis nobis, nulla error quam sit nihil provident recusandae quae doloremque neque
            eos, voluptatem minima iusto assumenda ea dicta a autem! Tenetur, provident veniam
            asperiores commodi, ratione necessitatibus quibusdam sit quaerat maxime distinctio
            lquuntur minus autem maiores qui fuga, voluptate quidem itaque amet aut maxime cumque
            libero deserunt nam possimus? Dolorum ipsa recusandae, placeat quasi iusto provident vel
            Laudantium quisquam, beatae laboriosam deleniti dolorum inventore eaque alias
          </Text>
          <Flex mt={30} gap={15}>
            <a href="https://github.com/yuvrajSoneja2004" target="_blank">
              <Center
                w={40}
                h={40}
                bg={'#2C3C49'}
                style={{ borderRadius: '7px', cursor: 'pointer' }}
              >
                <IconBrandGithub size={30} color={'#74C0FC'} />
              </Center>
            </a>
            <a href="https://www.linkedin.com/in/yuvrajsoneja/" target="_blank">
              <Center
                w={40}
                h={40}
                bg={'#2C3C49'}
                style={{ borderRadius: '7px', cursor: 'pointer' }}
              >
                <IconBrandLinkedin size={30} color={'#74C0FC'} />
              </Center>
            </a>

            <a href="https://www.reddit.com/user/PositionSuperb9076" target="_blank">
              <Center
                w={40}
                h={40}
                bg={'#2C3C49'}
                style={{ borderRadius: '7px', cursor: 'pointer' }}
              >
                <IconBrandReddit size={30} color={'#74C0FC'} />
              </Center>
            </a>
            <a href="https://twitter.com/YuvrajDev7524" target="_blank">
              <Center
                w={40}
                h={40}
                bg={'#2C3C49'}
                style={{ borderRadius: '7px', cursor: 'pointer' }}
              >
                <IconBrandTwitter size={30} color={'#74C0FC'} />
              </Center>
            </a>
          </Flex>
        </Box>
      </Flex>
    </Center>
  );
}

export default page;
