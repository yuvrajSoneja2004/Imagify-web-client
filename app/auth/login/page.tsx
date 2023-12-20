'use client';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/features/authSlice';

export default function LoginPage() {
  const [spinner, setSpinner] = useState<Boolean>(false);
  const navigate = useRouter();
  const storeUserInfo = useDispatch();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setSpinner(true);
    try {
      const formData = new FormData(event.currentTarget);
      const email: string | null = formData.get('user-email') as string | null;
      const password: string | null = formData.get('user-password') as string | null;
      // Form Validation
      if (!email || !password) {
        alert('Fill both email and password');
      }

      console.log('lol');

      console.log(email, password);
      // Sending data to server
      const { data } = await axios.post('/api/auth/login', {
        email,
        password,
      });
      console.log(data);

      if (data?.res) {
        // Store JWT token on local storage
        const { jwtToken } = data;
        localStorage.setItem('token', jwtToken);
        storeUserInfo(login(data?.data));
        navigate.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <form className={classes.bgWrapper} onSubmit={handleLogin}>
      <Container size={420} style={{ zIndex: 999 }}>
        <Title ta="center" c={'white'} className={classes.title}>
          Welcome back!
        </Title>
        <Text c="grey" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Link href={'/auth/register'} className={classes.anchor}>
            Create account
          </Link>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required name="user-email" />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            name="user-password"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" loading={spinner as boolean | undefined} type="submit">
            Sign in
          </Button>
        </Paper>
      </Container>
    </form>
  );
}
