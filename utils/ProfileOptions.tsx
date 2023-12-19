'use client';
import { useAppSelector } from '@/redux/store';
import { Avatar, Menu, Text, rem } from '@mantine/core';
import {
  IconArrowsLeftRight,
  IconDotsVertical,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
  IconUser,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

function ProfileOptions({}: Props) {
  const { avatarURI, username } = useAppSelector((state) => state.authSlice.value);
  const navigate = useRouter();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {/* <Button>Toggle menu</Button> */}
        {/* <IconDotsVertical cursor={'pointer'} /> */}
        <Avatar src={avatarURI ? avatarURI : ''} alt="avatar" style={{ cursor: 'pointer' }} />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{username}</Menu.Label>
        <Menu.Item
          leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => {
            navigate.push('/myprofile');
          }}
        >
          Your Profile
        </Menu.Item>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
          Settings
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          color="red"
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ProfileOptions;
