'use client';
import { useAppSelector } from '@/redux/store';
import { Avatar, Button, Card, Image, Title, Text, Group, Container } from '@mantine/core';
import { IconHeart, IconShare, IconMessageCircle, IconHeartFilled } from '@tabler/icons-react';
import axios from 'axios';

import React, { useState } from 'react';

interface FeedCardProps {
  userProfile: string;
  userName?: string;
  daysAgo: number;
  postConversation: [];
  likes: [];
  postDesc: string;
  feedId: string;
}

const FeedCard: React.FC<FeedCardProps> = ({
  userProfile,
  userName,
  daysAgo,
  postConversation,
  likes,
  postDesc,
  feedId,
}) => {
  // Dummy data for the feed card
  const feedData = {
    username: 'John Doe',
    timestamp: '2 hours ago',
    content: 'Check out this amazing post!',
    image: 'https://placekitten.com/600/400', // Replace with the actual image URL
    likes: 42,
    shares: 18,
    comments: 7,
  };

  const { userid, email } = useAppSelector((state) => state.authSlice.value);

  const [tempLikes, setTempLikes] = useState(likes.length);
  const [tempHasLiked, setTempHasLiked] = useState(likes.includes(userid));

  console.log('Ekda ekda', userid);

  const handleLike = async () => {
    try {
      const { data } = await axios.post(`/api/likeFeed/${feedId}`, {
        email,
      });
      if (!tempHasLiked) {
        setTempHasLiked(true);
      }
      if (data?.res) {
        setTempLikes((prev) => prev + 1);
        // TODO: Toast here
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async () => {
    try {
      const { data } = await axios.post(`/api/unlikeFeed/${feedId}`, {
        currentUserE: email,
      });
      if (tempHasLiked) {
        setTempHasLiked(false);
      }
      if (data?.res) {
        setTempLikes((prev) => prev - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card shadow="sm" style={{ maxWidth: 600 }}>
      {/* User Info */}
      <Group align="middle" style={{ marginBottom: 10 }}>
        <Avatar size="md" radius="xl" src="https://placekitten.com/100/100" alt="User Avatar" />
        <div style={{ marginLeft: 10 }}>
          <Title order={3} orderMd={2} style={{ marginBottom: 0 }}>
            {userName}
          </Title>
          <Text size="xs" c="gray">
            {feedData.timestamp}
          </Text>
        </div>
      </Group>

      {/* Post Content */}
      <Text>{feedData.content}</Text>

      {/* Post Image */}
      <Image src={feedData.image} alt="Post Image" style={{ marginTop: 10, marginBottom: 10 }} />

      {/* Like, Share, Comment Buttons */}
      <Group>
        <Button
          color="gray"
          leftSection={
            !tempHasLiked ? (
              <IconHeart size={18} onClick={handleLike} />
            ) : (
              <IconHeartFilled size={18} />
            )
          }
        >
          {likes.length}
        </Button>
        <Button color="gray" leftSection={<IconShare size={18} />}>
          {feedData.shares}
        </Button>
        <Button color="gray" leftSection={<IconMessageCircle size={18} />}>
          {feedData.comments}
        </Button>
      </Group>
    </Card>
  );
};

export default FeedCard;
