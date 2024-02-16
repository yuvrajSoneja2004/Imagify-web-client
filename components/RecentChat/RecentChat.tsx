'use client';
import React from 'react';
import S from './RecentChat.module.css';
import Image from 'next/image';
import { Text, useComputedColorScheme } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';

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
  const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

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
      style={{
        cursor: 'pointer',
        backgroundColor: colorScheme == 'dark' ? '#393B3B' : '#fff',
        boxShadow: colorScheme == 'dark' ? '' : 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      }}
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
