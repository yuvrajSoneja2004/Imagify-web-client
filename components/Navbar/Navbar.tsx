'use client';
import {
  Group,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  useMantineTheme,
  Image,
  Avatar,
  Flex,
  Text,
  useComputedColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Navbar.module.css';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/store';
import ProfileOptions from '@/utils/ProfileOptions';

export function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  // For now
  const username = useAppSelector((state) => state.authSlice.value.username);
  const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group h="100%" gap={0} visibleFrom="sm">
            <Image
              src={colorScheme == 'dark' ? './LOGO.png' : './inverted_logo.png'}
              alt="lol"
              width={23}
              height={23}
            />
          </Group>
          <Flex visibleFrom="sm" align={'center'} justify={'center'} gap={30}>
            <Link href={'/search'}>
              <IconSearch />
            </Link>
            <Text>{username}</Text>
            <ProfileOptions />
            <ThemeToggle />
          </Flex>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md"></Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
