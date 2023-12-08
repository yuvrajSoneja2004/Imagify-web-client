'use client';
import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
  IconHome2,
  IconPlus,
  IconLogout,
  IconSwitchHorizontal,
  IconListDetails,
  IconMessages,
  IconQuestionMark,
} from '@tabler/icons-react';
import classes from './Sidebar.module.css';
import { useRouter } from 'next/navigation';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  route?: string;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home', route: '/' },
  { icon: IconListDetails, label: 'Feed', route: '/feed' },
  { icon: IconPlus, label: 'Create', route: '/create-bot' },
  { icon: IconMessages, label: 'Chats', route: '/recent-chats' },
  { icon: IconQuestionMark, label: 'About', route: '/about' },
];

export function Sidebar() {
  const [active, setActive] = useState(2);
  const navigate = useRouter();

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        navigate.push(link.route);
      }}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>{/* <MantineLogo type="mark" size={30} /> */}</Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack>
    </nav>
  );
}
