'use client';
import React, { useEffect, useState } from 'react';
import RecentChat from '../RecentChat/RecentChat';
import { Box, Flex, Text } from '@mantine/core';
import CharacterCard from '../CharacterCard/CharacterCard';
import ContinueChatSkeletion from '../SkeletonLoaders/ContinueChatSkeleton/ContinueChatSkeleron';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';

function CardsCarousel() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

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

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Text fw={500} lts={0.2} mb={20}>
        Continue chatting
      </Text>
      {/* Will add loading later */}
      <Flex align={'center'} style={{ overflowX: 'auto', whiteSpace: 'nowrap' }} gap={500} w={400}>
        {isLoading ? (
          <ContinueChatSkeletion />
        ) : (
          data.map((data, index) => <RecentChat info={data} key={index} />)
        )}
      </Flex>

      <Text fw={500} lts={0.2} mb={20} mt={20}>
        Recommended
      </Text>
      <CharacterCard />
    </Box>
  );
}

export default CardsCarousel;
