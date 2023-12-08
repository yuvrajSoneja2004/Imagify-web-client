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

export default function LoginPage() {
  return (
    <div className={classes.bgWrapper}>
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
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
