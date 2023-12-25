import { Avatar, Button, Card, Image, Title, Text, Group, Container } from '@mantine/core';
import { IconHeart, IconShare, IconMessageCircle } from '@tabler/icons-react';

import React from 'react';

const FeedCard = () => {
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

  return (
    <Card shadow="sm" style={{ maxWidth: 600 }}>
      {/* User Info */}
      <Group align="middle" style={{ marginBottom: 10 }}>
        <Avatar size="md" radius="xl" src="https://placekitten.com/100/100" alt="User Avatar" />
        <div style={{ marginLeft: 10 }}>
          <Title order={3} orderMd={2} style={{ marginBottom: 0 }}>
            {feedData.username}
          </Title>
          <Text size="xs" color="gray">
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
        <Button color="gray" leftSection={<IconHeart size={18} />}>
          {feedData.likes}
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
