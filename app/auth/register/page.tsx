// Assuming the following imports from '@mantine/notifications' and '@mantine/core'
// These imports may vary based on the actual library structure, so make sure they are correct
'use client';
import { notifications, showNotification } from '@mantine/notifications';
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import classes from './RegisterStyles.module.css';
import Link from 'next/link';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const username: string | null = formData.get('user-name') as string | null;
      const email: string | null = formData.get('user-email') as string | null;
      const password: string | null = formData.get('user-password') as string | null;
      console.log('lll');
      // Form Validation
      if (!username || !email || !password) {
      }

      console.log('lol');

      console.log(username, email, password);
      // Sending data to server
      const { data } = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });
      console.log(data);

      if (data) {
        redirect('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={classes.bgWrapper} onSubmit={handleForm}>
      <Container size={420} style={{ zIndex: 999 }}>
        <Title ta="center" c={'white'} className={classes.title}>
          Welcome to Imagify!
        </Title>
        <Text c="gray" size="sm" ta="center" mt={5}>
          Already have an account?{' '}
          <Link href={'/auth/login'} className={classes.anchor}>
            Login
          </Link>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Nickname" placeholder="johe_doe" name="user-name" required />
          <TextInput
            label="Email"
            placeholder="johndoe@gmail.dev"
            mt="md"
            name="user-email"
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            name="user-password"
            required
          />
          <Group justify="space-between" mt="lg">
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Register
          </Button>
        </Paper>
      </Container>
    </form>
  );
}
