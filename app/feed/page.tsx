'use client';
import { Center, Container } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import FeedCard from '@/components/FeedCard/FeedCard';
import axios from 'axios';

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
        <div>
          {isLoading
            ? 'Loading....'
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
                />
              ))}
        </div>
      </Center>
    </Container>
  );
}

export default page;
