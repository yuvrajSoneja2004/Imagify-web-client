import React from 'react';
import S from './RecentChat.module.css';
import Image from 'next/image';
import { Text } from '@mantine/core';
import { useRouter } from 'next/navigation';

type Props = {
  info: {
    _id: string;
    name: string;
    avatar: string;
    createdBy: {
      username: string;
    };
    likes: number;
  };
};

function RecentChat({ info }: Props) {
  const navigate = useRouter();
  const {
    _id,
    avatar,
    name,
    createdBy: { username },
    likes,
  } = info;
  return (
    <div
      className={S.card}
      style={{ cursor: 'pointer' }}
      onClick={() => {
        navigate.push(`/chat?id=${_id}`);
      }}
    >
      <img src={avatar} alt="lol" style={{ borderRadius: '15px' }} />
      <Text fw={700} mt={7}>
        {name}
      </Text>
    </div>
  );
}

export default RecentChat;
