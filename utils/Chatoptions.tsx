'use client';
import FeedShareModel from '@/components/FeedShareModel/FeedShareModel';
import { Menu, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
import html2canvas from 'html2canvas';
import React, { useState } from 'react';

type Props = {};

function Chatoptions({}: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [feedImg, setFeeddImg] = useState<String>('https://via.placeholder.com/300');

  // Utility function to capture conversation information as image
  const captureConversation = async () => {
    try {
      const conversationElement = document.getElementById('conversation'); // Replace 'conversation' with the actual ID or class of your conversation container

      if (!conversationElement) {
        console.error('Conversation element not found');
        return;
      }

      // Add a delay to ensure the conversation content is properly rendered
      setTimeout(async () => {
        try {
          const canvas = await html2canvas(conversationElement as HTMLElement);
          const conversationImage = canvas.toDataURL('image/png');
          // Now, you can send conversationImage to your back end or use it as needed
          console.log('first', conversationImage);
          setFeeddImg(conversationImage);
        } catch (error) {
          console.log(error);
        }
      }, 1000); // Adjust the delay time as needed
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Menu shadow="md" width={200}>
      <FeedShareModel opened={opened} close={close} feedImg={feedImg} />
      <Menu.Target>
        {/* <Button>Toggle menu</Button> */}
        <IconDotsVertical cursor={'pointer'} />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<IconReport style={{ width: rem(14), height: rem(14) }} />}>
          Report
        </Menu.Item>
        <Menu.Item
          leftSection={<IconShare3 style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => {
            open();
            captureConversation();
          }}
        >
          Share Feed
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default Chatoptions;
