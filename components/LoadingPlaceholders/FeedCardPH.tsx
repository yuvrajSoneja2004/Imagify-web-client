'use client';
import React from 'react';
import { Skeleton, Card, Group, Avatar, Title, Text, Image } from '@mantine/core';

const FeedCardPlaceHolder: React.FC = () => {
  return (
    <Card shadow="sm" style={{ maxWidth: 600 }}>
      {/* User Info Skeleton */}
      <Group align="middle" style={{ marginBottom: 10 }}>
        <Skeleton width={40} height={40} radius="xl" />
        <div style={{ marginLeft: 10 }}>
          <Skeleton width={30} height={10} radius={'md'} />
          <Skeleton width={80} height={20} radius={'md'} mt={8} />
        </div>
      </Group>
      <Skeleton width={300} height={14} mb={12} mt={10} />
      {/* Post Content Skeleton */}
      <Skeleton height={300} style={{ marginBottom: 10 }} />

      {/* Like, Share, Comment Buttons Skeleton */}
      <Group>
        <Skeleton width={60} height={30} radius="md" style={{ marginRight: 10 }} />
        <Skeleton width={60} height={30} radius="md" style={{ marginRight: 10 }} />
      </Group>
    </Card>
  );
};

export default FeedCardPlaceHolder;
