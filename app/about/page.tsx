// Importing necessary dependencies from external libraries
'use client';
import React from 'react';
import { Avatar, Box, Center, Flex, Text, Title, em, useMantineTheme } from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandReddit,
  IconBrandTwitter,
  IconQuestionMark,
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

// Functional component representing the main page
function Page() {
  // Accessing the Mantine theme and checking for mobile and tablet breakpoints
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    // Centering the content vertically and applying padding based on screen size
    <Center h="100vh" p={isMobile ? 10 : 30}>
      {/* Creating a flexible container for layout */}
      <Flex
        align="center"
        justify="center"
        direction={isMobile ? 'column' : 'row'}
        mt={isMobile ? 50 : 0}
        gap={isMobile ? 20 : 40}
      >
        {/* Box for displaying the user's avatar */}
        <Box>
          <Avatar src="./about.jpg" alt="" size={isMobile ? 200 : 400} />
        </Box>
        {/* Box for holding user information */}
        <Box w={isMobile ? '100%' : isTablet ? 500 : 700}>
          {/* Flex container for aligning the icon and title */}
          <Flex align="center" gap={isMobile ? 10 : 20}>
            {/* Centering a question mark icon with a colored background */}
            <Center
              w={isMobile ? 40 : 60}
              h={isMobile ? 40 : 60}
              bg="#2C3C49"
              style={{ borderRadius: '7px' }}
            >
              <IconQuestionMark size={isMobile ? 60 : 80} color="#74C0FC" />
            </Center>
            {/* Title component for displaying the section title */}
            <Title size={isMobile ? 40 : 60} fw="bold">
              About
            </Title>
          </Flex>
          {/* Text component for displaying user information */}
          <Text mt={10} size={isMobile ? 'sm' : 'md'}>
            {/* Placeholder text */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id soluta fugit, veniam rerum
            consequuntur quisquam? Repudiandae similique repellat amet perferendis minus. Illo
            itaque quis nobis, nulla error quam sit nihil provident recusandae quae doloremque neque
            eos, voluptatem minima iusto assumenda ea dicta a autem! Tenetur, provident veniam
            asperiores commodi, ratione necessitatibus quibusdam sit quaerat maxime distinctio
            lquuntur minus autem maiores qui fuga, voluptate quidem itaque amet aut maxime cumque
            libero deserunt nam possimus? Dolorum ipsa recusandae, placeat quasi iusto provident vel
            Laudantium quisquam, beatae laboriosam deleniti dolorum inventore eaque alias
          </Text>
          {/* Flex container for social media icons */}
          <Flex mt={isMobile ? 20 : 30} gap={15}>
            {/* GitHub icon with a link to the user's GitHub profile */}
            <a href="https://github.com/yuvrajSoneja2004" target="_blank">
              <Center
                w={isMobile ? 40 : 50}
                h={isMobile ? 40 : 50}
                bg="#2C3C49"
                style={{ borderRadius: '7px', cursor: 'pointer' }}
              >
                <IconBrandGithub size={isMobile ? 30 : 40} color="#74C0FC" />
              </Center>
            </a>
            {/* LinkedIn icon with a link to the user's LinkedIn profile */}
            <a href="https://www.linkedin.com/in/yuvrajsoneja/" target="_blank">
              <Center
                w={isMobile ? 40 : 50}
                h={isMobile ? 40 : 50}
                bg="#2C3C49"
                style={{ borderRadius: '7px', cursor: 'pointer' }}
              >
                <IconBrandLinkedin size={isMobile ? 30 : 40} color="#74C0FC" />
              </Center>
            </a>
            {/* Reddit icon with a link to the user's Reddit profile */}
            <a href="https://www.reddit.com/user/PositionSuperb9076" target="_blank">
              <Center
                w={isMobile ? 40 : 50}
                h={isMobile ? 40 : 50}
                bg="#2C3C49"
                style={{ borderRadius: '7px', cursor: 'pointer' }}
              >
                <IconBrandReddit size={isMobile ? 30 : 40} color="#74C0FC" />
              </Center>
            </a>
            {/* Twitter icon with a link to the user's Twitter profile */}
            <a href="https://twitter.com/YuvrajDev7524" target="_blank">
              <Center
                w={isMobile ? 40 : 50}
                h={isMobile ? 40 : 50}
                bg="#2C3C49"
                style={{ borderRadius: '7px', cursor: 'pointer' }}
              >
                <IconBrandTwitter size={isMobile ? 30 : 40} color="#74C0FC" />
              </Center>
            </a>
          </Flex>
        </Box>
      </Flex>
    </Center>
  );
}

// Exporting the Page component as the default export
export default Page;
