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

export default function LoginPage() {
  return (
    <div className={classes.bgWrapper}>
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
          <TextInput label="Nickname" lol="johe_doe" required />
          <TextInput label="Email" lol="johndoe@gmail.dev" required mt="md" />
          <PasswordInput label="Password" lol="Your password" required mt="md" />
          <Group justify="space-between" mt="lg">
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Register
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
