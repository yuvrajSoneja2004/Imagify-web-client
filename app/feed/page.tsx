'use client';
import { Box, Center, Container, Flex } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import FeedCard from '@/components/FeedCard/FeedCard';
import axios from 'axios';
import FeedCardPlaceHolder from '@/components/LoadingPlaceholders/FeedCardPH';

function page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('/api/getPosts');
      setPosts(data);
      console.log(data, 'god of war');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <Container mt={20}>
      <Center>
        <Flex w={'100%'} direction={'column'} gap={20}>
          {isLoading
            ? Array.from({ length: 10 }, (_, index) => <FeedCardPlaceHolder key={index} />)
            : posts.map((post, index) => (
                <FeedCard
                  key={index}
                  userName={post?.userName}
                  userProfile={post?.userProfilePic}
                  daysAgo={post?.createdAt}
                  likes={post?.likes}
                  postConversation={post?.conversation}
                  postDesc={post?.postDesc}
                  feedId={post?._id}
                  feedComments={post?.comments}
                />
              ))}
        </Flex>
      </Center>
    </Container>
  );
}

export default page;
