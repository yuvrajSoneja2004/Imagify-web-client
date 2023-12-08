import React from 'react';
import RecentChat from '../RecentChat/RecentChat';
import { Box, Text } from '@mantine/core';
import CharacterCard from '../CharacterCard/CharacterCard';

function CardsCarousel() {
  return (
    <Box>
      <Text fw={500} lts={0.2} mb={20}>
        Continue chatting
      </Text>
      <RecentChat />
      <Text fw={500} lts={0.2} mb={20} mt={20}>
        Recommended
      </Text>
      <CharacterCard />
    </Box>
  );
}

export default CardsCarousel;
