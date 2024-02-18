'use client';
import React from 'react';
import S from './RecentChat.module.css';
import Image from 'next/image';
import { Text, useComputedColorScheme } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';

type Props = {
  info: {
    charId: string;
    charAvatar: string;
    charName: string;
  };
};

function RecentChat({ info }: Props) {
  const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const navigate = useRouter();
  const { charId, charAvatar, charName } = info;
  return (
    <div
      className={S.card}
      style={{
        cursor: 'pointer',
        backgroundColor: colorScheme == 'dark' ? '#393B3B' : '#fff',
        boxShadow: colorScheme == 'dark' ? '' : 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      }}
      onClick={() => {
        navigate.push(`/chat?id=${charId}`);
      }}
    >
      <img src={charAvatar} alt="lol" style={{ borderRadius: '15px' }} />
      <Text fw={700} mt={7}>
        {charName}
      </Text>
    </div>
  );
}

export default RecentChat;
