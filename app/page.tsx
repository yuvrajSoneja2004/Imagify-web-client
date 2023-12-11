import CardsCarousel from '@/components/CardsSlider/CardsSlider';
import { useAppSelector } from '@/redux/store';
import { Box, Text } from '@mantine/core';

export default function HomePage() {
  // const getV = useAppSelector((s) => {
  //   return s.authSlice.value.username;
  // });
  return (
    <Box h={'100vh'} pl={20} pr={20} pt={20}>
      <CardsCarousel />
    </Box>
  );
}
