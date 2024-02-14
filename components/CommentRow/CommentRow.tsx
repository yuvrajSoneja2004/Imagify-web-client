import React from 'react';
import { Avatar, Text } from '@mantine/core';
import TimeAgo from '@/lib/timeAgo';

interface CommentInfo {
  info: {
    text: string;
    createdAt: Date;
    profileName: string;
    profilePic: string;
  };
}

function CommentCard({ info }: CommentInfo) {
  const { text, createdAt, profileName, profilePic } = info;

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        gap: '8px',
        borderRadius: '8px',
        border: '2px solid #464646',
        padding: '12px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Avatar
        style={{
          width: '40px',
          height: '40px',
        }}
      >
        <img src={profilePic} alt={'profileName'} />
      </Avatar>
      <div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <strong>{profileName}</strong>
          <TimeAgo createdAt={createdAt} fs="sm" />
        </div>
        <Text>{text}</Text>
      </div>
    </div>
  );
}

export default CommentCard;
