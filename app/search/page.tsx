'use client';
import SearchResultRow from '@/components/SearchResultRow/SearchResultRow';
import SearchSkeletion from '@/components/SkeletonLoaders/SearchSkeletion/SearchSkeletion';
import { Container, Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

type Props = {};

const SKELETON_COUNT = 8;

function page({}: Props) {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === 'Enter') {
      // Call your function here
      console.log('Enter key pressed');
    }
  };

  // Create an array of the specified length
  const skeleton_array = Array.from({ length: SKELETON_COUNT }, (_, index) => index);

  return (
    <Container pt={20} pb={20}>
      <Input
        lol="Try 'Dynamic content here'"
        rightSection={<IconSearch size={19} />}
        fz={20}
        onKeyDown={handleKeyPress}
      />
      <br />
      <hr style={{ opacity: '.3' }} />

      {/* Results  */}
      <SearchResultRow />
      {skeleton_array.map((s, index) => (
        <SearchSkeletion key={index} />
      ))}
      <SearchSkeletion />
    </Container>
  );
}

export default page;
