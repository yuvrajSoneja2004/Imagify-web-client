import CardsCarousel from '@/components/CardsSlider/CardsSlider';
import { FooterSocial } from '@/components/Footer/Footer';
import { Box, Text } from '@mantine/core';

export default async function HomePage() {
  return (
    <Box h={'100vh'} pl={20} pr={20} pt={20}>
      <CardsCarousel />
      <FooterSocial />
    </Box>
  );
}
