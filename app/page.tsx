import CardsCarousel from '@/components/CardsSlider/CardsSlider';
import { Box, Center, Group, Text, Title } from '@mantine/core';

export default function HomePage() {
  return (
    <Box h={'100vh'} pl={20} pr={20} pt={20}>
      <CardsCarousel />
    </Box>
  );
}
