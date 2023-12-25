'use client';
import { Menu, Text, rem } from '@mantine/core';
import {
  IconArrowsLeftRight,
  IconDotsVertical,
  IconMessageCircle,
  IconPhoto,
  IconReport,
  IconSearch,
  IconSettings,
  IconShare3,
  IconTrash,
} from '@tabler/icons-react';
import React from 'react';

type Props = {};

function Chatoptions({}: Props) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {/* <Button>Toggle menu</Button> */}
        <IconDotsVertical cursor={'pointer'} />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<IconReport style={{ width: rem(14), height: rem(14) }} />}>
          Report
        </Menu.Item>
        <Menu.Item leftSection={<IconShare3 style={{ width: rem(14), height: rem(14) }} />}>
          Share Feed
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default Chatoptions;
