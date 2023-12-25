'use client';
import { Center, Container } from '@mantine/core';
import React from 'react';
import html2canvas from 'html2canvas';
import FeedCard from '@/components/FeedCard/FeedCard';

function page() {
  const captureConversation = async () => {
    const conversationElement = document.getElementById('conversation'); // Replace 'conversation' with the actual ID or class of your conversation container
    const canvas = await html2canvas(conversationElement as HTMLElement);
    const conversationImage = canvas.toDataURL('image/png');
    // Now, you can send conversationImage to your back end or use it as needed
    console.log('first', conversationImage);
  };

  return (
    <Container mt={20}>
      <Center>
        <div id="conversation">
          <FeedCard />
        </div>
      </Center>
    </Container>
  );
}

export default page;
