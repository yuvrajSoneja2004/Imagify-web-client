'use client';
import React, { useEffect, useState } from 'react';
import RecentChat from '../RecentChat/RecentChat';
import { Box, Flex, Grid, Text, rem, useMantineTheme } from '@mantine/core';
import CharacterCard from '../CharacterCard/CharacterCard';
import ContinueChatSkeletion from '../SkeletonLoaders/ContinueChatSkeleton/ContinueChatSkeleron';
import axios from 'axios';
// import { Carousel } from '@mantine/carousel';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import classes from './CardsSlider.module.css';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import Carousel from 'react-elastic-carousel'
import { useAppSelector } from '@/redux/store';

function CardsCarousel() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();
  const { recentChats } = useAppSelector((state) => state.authSlice.value);
  console.log('Amaku side diyo re re ', recentChats);
  const getData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('/api/createBot');
      if (data?.res) {
        setData(data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const length = 5;
  const LOADER_ARRAY = Array.from({ length }, (_, index) => index);

  useEffect(() => {
    getData();
  }, []);

  const customArrow = ({ type, onClick, isEdge }) => {
    const arrowColor = '#1971C2'; // Set your desired color

    return (
      <button
        onClick={onClick}
        disabled={isEdge}
        style={{
          color: arrowColor,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px', // Customize as needed
        }}
      >
        {type === 'PREV' ? <IconArrowLeft /> : <IconArrowRight />}
      </button>
    );
  };

  const customPagination = ({ pages, activePage, onClick }) => {
    const dotColor = '#1971C2'; // Set your desired color

    return (
      <div>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onClick(page)}
            style={{
              width: '8px',
              height: '8px',
              margin: '0 5px',
              borderRadius: '50%',
              backgroundColor: dotColor,
              color: dotColor,
              border: 'none',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <Box>
      <Text fw={500} lts={0.2} mb={20}>
        Continue chatting
      </Text>

      <Carousel
        itemsToScroll={1}
        itemsToShow={isMobile ? 1 : 5}
        renderArrow={customArrow}
        pagination={customPagination}
      >
        {isLoading
          ? LOADER_ARRAY.map((_, index) => (
              <Box key={index} pl={isMobile ? 2 : 10} pr={isMobile ? 2 : 10}>
                <ContinueChatSkeletion />
              </Box>
            ))
          : // here
            recentChats.map((item, index) => (
              <div key={index}>
                <RecentChat info={item} />
              </div>
            ))}
      </Carousel>

      <Text fw={500} lts={0.2} mb={20} mt={20}>
        Recommended
      </Text>

      <Grid>
        {isLoading
          ? LOADER_ARRAY.map((_, index) => (
              <Box key={index} pl={isMobile ? 2 : 10} pr={isMobile ? 2 : 10}>
                <ContinueChatSkeletion />
              </Box>
            ))
          : data.map((item, index) => (
              <Grid.Col key={index} span={isMobile ? 6 : 2}>
                <CharacterCard info={item} />
              </Grid.Col>
            ))}
      </Grid>
    </Box>
  );
}

export default CardsCarousel;
