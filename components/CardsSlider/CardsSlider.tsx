import React from 'react';
import RecentChat from '../RecentChat/RecentChat';
import { Box, Text } from '@mantine/core';
import CharacterCard from '../CharacterCard/CharacterCard';
import ContinueChatSkeletion from '../SkeletonLoaders/ContinueChatSkeleton/ContinueChatSkeleron';

function CardsCarousel() {
  return (
    <Box>
      <Text fw={500} lts={0.2} mb={20}>
        Continue chatting
      </Text>
      {/* Will add loading later */}
      <ContinueChatSkeletion />
      <RecentChat />
      <Text fw={500} lts={0.2} mb={20} mt={20}>
        Recommended
      </Text>
      <CharacterCard />
    </Box>
  );
}

export default CardsCarousel;
