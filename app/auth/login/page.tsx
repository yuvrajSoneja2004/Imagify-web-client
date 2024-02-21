// Importing necessary dependencies from external libraries and modules
'use client';
import React from 'react';
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

// Functional component representing the Login page
export default function LoginPage() {
  // State for controlling the loading spinner
  const [spinner, setSpinner] = useState<Boolean>(false);

  // Hooks for navigation and Redux store
  const navigate = useRouter();
  const storeUserInfo = useDispatch();

  // Function to handle the login form submission
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setSpinner(true);

    try {
      const formData = new FormData(event.currentTarget as HTMLFormElement | undefined);
      const email: string | null = formData.get('user-email') as string | null;
      const password: string | null = formData.get('user-password') as string | null;

      // Form Validation
      if (!email || !password) {
        alert('Fill both email and password');
      }

      // Logging email and password for debugging purposes
      console.log(email, password);

      // Sending data to the server
      const { data } = await axios.post('/api/auth/login', {
        email,
        password,
      });

      // Handling the response from the server
      if (data?.res) {
        // Storing JWT token in local storage
        const { jwtToken } = data;
        localStorage.setItem('token', jwtToken);

        // Dispatching user login action to Redux store
        storeUserInfo(login(data?.data) as { payload: any; type: string });

        // Navigating to the home page
        navigate.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };

  return (
    // Login form wrapper with a background color
    <form className={classes.bgWrapper} onSubmit={handleLogin}>
      {/* Container for the login form */}
      <Container size={420} style={{ zIndex: 999 }}>
        {/* Title for the login form */}
        <Title ta="center" c={'white'} className={classes.title}>
          Welcome back!
        </Title>
        {/* Text with a link to the registration page */}
        <Text c="grey" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Link href={'/auth/register'} className={classes.anchor}>
            Create account
          </Link>
        </Text>
        {/* Paper component for styling the login form */}
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {/* Input fields for email and password */}
          <TextInput label="Email" placeholder="you@mantine.dev" required name="user-email" />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            name="user-password"
          />
          {/* Checkbox for "Remember me" and a link for "Forgot password?" */}
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          {/* Button for submitting the login form */}
          <Button fullWidth mt="xl" loading={spinner as boolean | undefined} type="submit">
            Sign in
          </Button>
        </Paper>
      </Container>
    </form>
  );
}
