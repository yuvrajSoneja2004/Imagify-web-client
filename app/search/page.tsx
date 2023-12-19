'use client';
import NoResults from '@/components/NoSearchResults/NoResults';
import SearchResultRow from '@/components/SearchResultRow/SearchResultRow';
import SearchSkeletion from '@/components/SkeletonLoaders/SearchSkeletion/SearchSkeletion';
import { Container, Input, Text, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import axios from 'axios';
import { useState } from 'react';

type Props = {};

const SKELETON_COUNT = 8;

function page({}: Props) {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [searchInput, setSearchInput] = useState<String>('');
  const [searchResults, setSearchResults] = useState([]);
  const [isInitialVisit, setIsInitialVisit] = useState<Boolean>(true);
  const [noResult, setNoResults] = useState(false);
  console.log(searchResults);
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      if (searchInput === '') {
        alert('Enter search input');
      } else {
        const { data } = await axios.get(`/api/search?query=${searchInput}`);
        console.log(data);

        if (data?.resMsg) {
          setNoResults(true);
        }

        if (data?.res) {
          setSearchResults(data?.data);
          setNoResults(false);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsInitialVisit(false);
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === 'Enter') {
      // Call your function here
      handleSearch();
    }
  };

  // Create an array of the specified length
  const skeleton_array = Array.from({ length: SKELETON_COUNT }, (_, index) => index);

  return (
    <Container pt={20} pb={20}>
      <Input
        placeholder="Try 'Dynamic content here'"
        rightSection={<IconSearch size={19} />}
        fz={20}
        onKeyDown={handleKeyPress}
        value={searchInput as string}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
      <br />
      <hr style={{ opacity: '.3' }} />

      {/* Results  */}

      {isInitialVisit ? (
        <NoResults title="Try Searching Something" imgsrc="./try_searching.svg" />
      ) : noResult ? (
        <NoResults title="No Results" imgsrc="./no-results.png" />
      ) : isLoading ? (
        skeleton_array.map((s, index) => <SearchSkeletion key={index} />)
      ) : (
        searchResults.map((result, index) => {
          console.log('jumed here');
          return <SearchResultRow key={index} info={result} />;
        })
      )}
    </Container>
  );
}

export default page;
