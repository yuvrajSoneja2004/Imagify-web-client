'use client';
import { useAppSelector } from '@/redux/store';
import {
  Avatar,
  Button,
  Card,
  Image,
  Title,
  Text,
  Group,
  Container,
  useComputedColorScheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconHeart, IconShare, IconMessageCircle, IconHeartFilled } from '@tabler/icons-react';
import axios from 'axios';

import React, { useState } from 'react';
import CommentsDrawer from '../CommentsDrawer/CommentsDrawer';

interface FeedCardProps {
  userProfile: string;
  userName?: string;
  daysAgo: number;
  postConversation: [];
  likes: [];
  postDesc: string;
  feedId: string;
  feedComments: [];
}

const FeedCard: React.FC<FeedCardProps> = ({
  userProfile,
  userName,
  daysAgo,
  postConversation,
  likes,
  postDesc,
  feedId,
  feedComments,
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

  const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const { userid, email } = useAppSelector((state) => state.authSlice.value);

  const [tempLikes, setTempLikes] = useState(likes.length);
  const [tempHasLiked, setTempHasLiked] = useState(likes.includes(email));
  const [comments, setComments] = useState();

  console.log('Ekda ekda', userid);

  const handleLike = async () => {
    try {
      const { data } = await axios.post(`/api/likeFeed`, {
        feedId,
        email,
      });
      if (!tempHasLiked) {
        setTempHasLiked(true);
      }
      if (data) {
        setTempLikes((prev) => prev + 1);
        // TODO: Toast here
        notifications.show({
          title: 'Liked Successfully',
          message: 'Hey there, your code is awesome! 🤥',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async () => {
    try {
      const { data } = await axios.post(`/api/unlikeFeed`, {
        feedId,
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

      {/* Like, Comment Buttons */}
      <Group>
        <Button
          variant="transparent"
          color={colorScheme == 'dark' ? '#ffffff' : '#000'}
          leftSection={
            !tempHasLiked ? (
              <IconHeart
                size={18}
                onClick={handleLike}
                color={colorScheme == 'dark' ? '#ffffff' : '#000'}
              />
            ) : (
              <IconHeartFilled
                size={18}
                onClick={handleUnlike}
                color={colorScheme == 'dark' ? '#ffffff' : '#000'}
              />
            )
          }
        >
          {tempLikes}
        </Button>
        {/* Comments */}
        <CommentsDrawer noOfComments={feedData?.comments} comments={feedComments} feedId={feedId} />
      </Group>
    </Card>
  );
};

export default FeedCard;
