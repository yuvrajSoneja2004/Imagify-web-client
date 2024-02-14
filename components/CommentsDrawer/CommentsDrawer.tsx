'use client';
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Flex, Input, ScrollArea, Loader } from '@mantine/core';
import { IconMessageCircle, IconSend } from '@tabler/icons-react';
import CommentCard from '../CommentRow/CommentRow';
import { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/redux/store';
import { notifications } from '@mantine/notifications';

function CommentsDrawer({ noOfComments, comments, feedId }: any) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isBeingPosted, setisBeingPosted] = useState(false);
  const [input, setInput] = useState('');
  console.log('Xaroorat', comments);
  const { username, avatarURI } = useAppSelector((state) => state.authSlice.value);
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      // DO SOMEzting
      postComment();
    }
  };
  const postComment = async () => {
    setInput('');
    setisBeingPosted(true);

    try {
      if (input.length === 0) {
        alert('Please enter something to comment');
      } else {
        const { data } = await axios.post(`/api/postComment`, {
          feedId,
          comment: input,
          createdAt: Date.now(),
          profileName: username,
          profilePic: !avatarURI ? 'NOT_DEFINED_YET' : avatarURI,
        });
        if (data?.res) {
          notifications.show({
            title: 'Commented Successfully',
            message: 'Posed comment successfully',
          });
        }
      }
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setisBeingPosted(false);
    }
  };

  return (
    <>
      <Drawer opened={opened} onClose={close} title={`Comments (${noOfComments})`}>
        {/* Drawer content */}
        <Flex direction={'column'}>
          <ScrollArea style={{ marginBottom: '60px' }} h={520}>
            {/* Add bottom margin to make space for the input flex */}
            <Flex direction={'column'} gap={10}>
              {comments.map((comment, index) => {
                return <CommentCard info={comment} />;
              })}
            </Flex>
          </ScrollArea>
          {/* Post comment  */}
          <Flex
            style={{
              position: 'fixed',
              bottom: '0',
              left: '0',
              width: '100%',
              padding: '15px',
            }}
            align="center"
            gap={7}
          >
            <Input
              placeholder="Enter comment here."
              style={{ flex: '1' }}
              onKeyDown={handleKeyPress}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <Button>{isBeingPosted ? <Loader color="white" size={16} /> : <IconSend />}</Button>
          </Flex>
        </Flex>
      </Drawer>

      <Button color="gray" leftSection={<IconMessageCircle size={18} />} onClick={open}>
        {noOfComments}
      </Button>
    </>
  );
}

export default CommentsDrawer;
