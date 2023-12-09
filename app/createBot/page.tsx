import {
  Avatar,
  Box,
  Button,
  Center,
  FileInput,
  Flex,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';

import {
  IconCirclesRelation,
  IconHandRock,
  IconMan,
  IconRobot,
  IconUpload,
  IconUser,
  IconUserCircle,
} from '@tabler/icons-react';
import React from 'react';
import S from './styles.module.css';
type Props = {};

function page({}: Props) {
  return (
    <Box p={20}>
      <Flex align={'center'} gap={5}>
        <IconMan size={30} />
        <Title fw={'bold'}>Create a Character!</Title>
      </Flex>
      {/* Inputs starts from here  */}
      {/* Name  */}
      <Box mt={40}>
        <Flex align={'center'} gap={8}>
          <Center w={40} h={40} bg={'#2C3C49'} style={{ borderRadius: '7px' }}>
            <IconUser size={20} color={'#74C0FC'} />
          </Center>
          <Text fw={'bold'}>Name</Text>
        </Flex>
        <Text c={'dimmed'} fz={13} mb={5} mt={3}>
          The name of the character you want to create.
        </Text>
        <TextInput placeholder="eg: Saitama" />
      </Box>
      {/* Greeting */}
      <Box mt={30}>
        <Flex align={'center'} gap={8}>
          <Center w={40} h={40} bg={'#2C3C49'} style={{ borderRadius: '7px' }}>
            <IconHandRock size={20} color={'#74C0FC'} />
          </Center>
          <Text fw={'bold'}>Greeting</Text>
        </Flex>
        <Text c={'dimmed'} fz={13} mb={5} mt={3}>
          What would they say to introduce themselves? For example, "Jethalal Gada" could say:
          "Mujhe babita ji pasand hai aur mujhe jelebi phapdha khana pasand hai".
        </Text>
        <Textarea placeholder="eg: Sup man! I like potatos" rows={6} />
      </Box>
      {/* Avatar Selection */}
      <Flex align={'center'} justify={'space-between'} className={S.responsive}>
        <Box mt={30}>
          <Flex align={'center'} gap={8}>
            <Center w={40} h={40} bg={'#2C3C49'} style={{ borderRadius: '7px' }}>
              <IconUserCircle size={20} color={'#74C0FC'} />
            </Center>
            <Text fw={'bold'}>Avatar</Text>
          </Flex>
          <Text c={'dimmed'} fz={13} mb={5} mt={3}>
            You can either let this app choose the avatar for you based on the name or you can
            select avatar from the system.
          </Text>
          <Flex align={'center'} gap={15} mt={15} className={S.inputFile}>
            <Button leftSection={<IconRobot size={20} />}>
              Let the app select picture for you.
            </Button>
            <Text>OR</Text>
            <FileInput placeholder="Click here to choose" leftSection={<IconUpload size={20} />} />
          </Flex>
        </Box>
        <Avatar size={90} className={S.avatar} />
      </Flex>
      {/* Emotions  */}
      <Box mt={30}>
        <Flex align={'center'} gap={8}>
          <Center w={40} h={40} bg={'#2C3C49'} style={{ borderRadius: '7px' }}>
            <IconCirclesRelation size={20} color={'#74C0FC'} />
          </Center>
          <Text fw={'bold'}>Greeting</Text>
        </Flex>
        <Text c={'dimmed'} fz={13} mb={5} mt={3}>
          What would they say to introduce themselves? For example, "Jethalal Gada" could say:
          "Mujhe babita ji pasand hai aur mujhe jelebi phapdha khana pasand hai".
        </Text>
        <Textarea placeholder="eg: Sup man! I like potatos" rows={6} />
      </Box>
    </Box>
  );
}

export default page;
