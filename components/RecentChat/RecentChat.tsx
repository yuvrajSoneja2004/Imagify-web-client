import React from 'react';
import S from './RecentChat.module.css';
import Image from 'next/image';
import { Text } from '@mantine/core';

type Props = {};

function RecentChat({}: Props) {
  return (
    <div className={S.card}>
      <img
        src="https://characterai.io/i/400/static/avatars/uploaded/2022/10/6/qHO2fZ4bR4wEx6I2DgrwrfVb1z8KtKZviuQ6lPqCN_w.webp"
        alt="lol"
        style={{ borderRadius: '15px' }}
      />
      <Text fw={700} mt={7}>
        Saitama
      </Text>
    </div>
  );
}

export default RecentChat;
