import React from 'react';
import S from './RecentChat.module.css';
import Image from 'next/image';
import { Text } from '@mantine/core';

type Props = {
  info: {
    name: string;
    avatar: string;
    createdBy: {
      username: string;
    };
    likes: number;
  };
};

function RecentChat({ info }: Props) {
  const {
    avatar,
    name,
    createdBy: { username },
    likes,
  } = info;
  return (
    <div className={S.card}>
      <img src={avatar} alt="lol" style={{ borderRadius: '15px' }} />
      <Text fw={700} mt={7}>
        {name}
      </Text>
    </div>
  );
}

export default RecentChat;
