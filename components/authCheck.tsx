'use client';
import { login } from '@/redux/features/authSlice';
import { useAppSelector } from '@/redux/store';
import { Box, Text } from '@mantine/core';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import React from 'react';

export default function AuthCheck({ children }) {
  const storeUserInfo = useDispatch();
  const navigate = useRouter();
  const pathName = usePathname();
  console.log(pathName);

  const getUserInfo = async (token: TokenObject) => {
    try {
      const { data } = await axios.get(`/api/getuserinfo?id=${token.userId}`);

      if (data?.res) {
        storeUserInfo(login(data?.info));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        const jwttok: JWType = jwtDecode(storedToken);
        await getUserInfo(jwttok);
        navigate.push(pathName);
      } else {
        navigate.push('/auth/login');
      }
    };

    checkAuthentication();
  }, []); // Empty dependency array ensures the effect runs once on mount

  return <>{children}</>;
}
