'use client';
import { login } from '@/redux/features/authSlice';
import { useAppSelector } from '@/redux/store';
import { Box, Text } from '@mantine/core';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function HomePage() {
  const l = useAppSelector((s) => s.authSlice.value);

  const storeUserInfo = useDispatch();
  const navigate = useRouter();
  interface JWType {
    userId: string;
    useravatar: string;
    username: string;
  }

  interface TokenObject {
    userId: string;
  }

  const getUserInfo = async (token: TokenObject) => {
    try {
      const { data } = await axios.get(`/api/getuserinfo?id=${token.userId}`);

      if (data?.res) {
        storeUserInfo(login(data?.info));
      }
    } catch (error) {}
  };

  const storedToken = localStorage.getItem('token');

  if (storedToken) {
    const jwttok: JWType = jwtDecode(storedToken);
    getUserInfo(jwttok);
    navigate.push('/characters');
  } else {
    navigate.push('/auth/login');
  }

  useEffect(() => {
    console.log(l, 'nang');
  }, [l]);

  return (
    <Box h={'100vh'} pl={20} pr={20} pt={20}>
      <Text>Checker</Text>
    </Box>
  );
}
