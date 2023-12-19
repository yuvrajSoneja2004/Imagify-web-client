'use client';
import React, { useEffect, useState } from 'react';
import RecentChat from '../RecentChat/RecentChat';
import { Box, Flex, Text, rem, useMantineTheme } from '@mantine/core';
import CharacterCard from '../CharacterCard/CharacterCard';
import ContinueChatSkeletion from '../SkeletonLoaders/ContinueChatSkeleton/ContinueChatSkeleron';
import axios from 'axios';
import { Carousel } from '@mantine/carousel';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import classes from './CardsSlider.module.css';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';

function CardsCarousel() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const navigate = useRouter();

  const getData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('/api/createBot');
      if (data?.res) {
        console.log(data?.data);
        setData(data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const length = 5;
  const LOADER_ARRAY = Array.from({ length }, (_, index) => index);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Text fw={500} lts={0.2} mb={20}>
        Continue chatting
      </Text>
      {/* Will add loading later */}
      <Carousel
        withIndicators
        height={200}
        slideSize={{ base: '100%', sm: '33.333%', md: '33.3333%' }}
        slideGap={{ base: 0, sm: 2 }}
        slidesToScroll={mobile ? 1 : 2}
        align="start"
        nextControlIcon={
          <IconArrowRight style={{ width: rem(16), height: rem(16) }} color="black" />
        }
        previousControlIcon={
          <IconArrowLeft style={{ width: rem(16), height: rem(16) }} color="black" />
        }
      >
        {isLoading
          ? LOADER_ARRAY.map((_, index) => (
              <Box pl={10} pr={10}>
                <ContinueChatSkeletion key={index} />
              </Box>
            ))
          : data.map((item, index) => (
              <Carousel.Slide key={index}>
                <RecentChat info={item} key={index} />
              </Carousel.Slide>
            ))}
      </Carousel>

      <Text fw={500} lts={0.2} mb={20} mt={20}>
        Recommended
      </Text>
      <div>
        {isLoading
          ? LOADER_ARRAY.map((_, index) => (
              <Box pl={10} pr={10}>
                <ContinueChatSkeletion key={index} />
              </Box>
            ))
          : data.map((item, index) => <CharacterCard info={item} />)}
      </div>
    </Box>
  );
}

export default CardsCarousel;
