'use client';
import {
  Avatar,
  Box,
  Button,
  Center,
  FileInput,
  Flex,
  RangeSlider,
  Slider,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';

import {
  IconCircleCheck,
  IconCirclesRelation,
  IconHandRock,
  IconMan,
  IconRobot,
  IconUpload,
  IconUser,
  IconUserCircle,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import S from './styles.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';
type Props = {};

function page({}: Props) {
  const [spinner, setSpinner] = useState<Boolean>(false);
  const navigate = useRouter();

  const [fileSpinner, setFileSpinner] = useState<Boolean>(false);
  const [renderController, setRenderController] = useState(1);

  const [base64String, setBase64String] = useState('');

  const currentUser = useAppSelector((state) => state.authSlice.value);

  const handleFile = async (files: File[]) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Result = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();
    setSpinner(true);
    try {
      const formData = new FormData(event.currentTarget);
      const name: string | null = formData.get('character-name') as string | null;
      const intro: string | null = formData.get('character-intro') as string | null;
      const avatar: File | null = formData.get('character-avatar') as File | null;
      const anger: string | null = formData.get('character-anger') as string | null;
      const rudeness: string | null = formData.get('character-rudeness') as string | null;
      const kindness: string | null = formData.get('character-kindness') as string | null;
      const excitement: string | null = formData.get('character-excitment') as string | null;

      // Convert avatar file to base64
      if (avatar) {
        setBase64String(await convertFileToBase64(avatar));
      }
      console.log(name, intro, base64String, rudeness, anger, kindness, excitement);

      // Sending data to server
      const { data } = await axios.post('/api/createBot', {
        name,
        intro,
        avatar: await convertFileToBase64(avatar as File),
        anger,
        rudeness,
        kindness,
        excitement,
        createdBy: currentUser,
      });
      console.log(data);

      if (data?.res) {
        navigate.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <form onSubmit={handleForm}>
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
          <TextInput placeholder="eg: Saitama" name="character-name" required />
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
          <Textarea
            placeholder="eg: Sup man! I like potatos"
            rows={6}
            name="character-intro"
            required
          />
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
              <Button leftSection={<IconCircleCheck size={20} />} loading={fileSpinner as boolean}>
                Let the app select picture for you.
              </Button>
              <Text>OR</Text>
              <FileInput
                placeholder="Click here to choose"
                leftSection={<IconUpload size={20} />}
                name="character-avatar"
              />
            </Flex>
          </Box>
          <Avatar size={90} className={S.avatar} src={base64String} key={renderController} />
        </Flex>
        {/* Emotions  */}
        <Box mt={30}>
          <Flex align={'center'} gap={8}>
            <Center w={40} h={40} bg={'#2C3C49'} style={{ borderRadius: '7px' }}>
              <IconCirclesRelation size={20} color={'#74C0FC'} />
            </Center>
            <Text fw={'bold'}>Emotions</Text>
          </Flex>
          <Text c={'dimmed'} fz={13} mb={5} mt={3}>
            The character will dynamically respond and engage with the user, tailoring its reactions
            and dialogue in accordance with the specified levels of emotions.{' '}
          </Text>
          <Stack w={200} mt={20}>
            <Box>
              <Text fw={'bold'}>Anger</Text>
              <Slider
                defaultValue={20}
                label={(value) => `${value} %`}
                mt={5}
                name="character-anger"
              />
            </Box>
            <Box>
              <Text fw={'bold'}>Rudeness</Text>
              <Slider
                defaultValue={15}
                label={(value) => `${value} %`}
                mt={5}
                name="character-rudeness"
              />
            </Box>
            <Box>
              <Text fw={'bold'}>Kindness</Text>
              <Slider
                defaultValue={70}
                label={(value) => `${value} %`}
                mt={5}
                name="character-kindness"
              />
            </Box>
            <Box>
              <Text fw={'bold'}>Excitement</Text>
              <Slider
                defaultValue={40}
                label={(value) => `${value} %`}
                mt={5}
                name="character-excitment"
              />
            </Box>
          </Stack>
        </Box>
        {/* Create bot  */}
        <Flex w={'100%'} justify={'end'} mt={20}>
          <Button leftSection={<IconRobot size={20} />} type="submit" loading={spinner as boolean}>
            Create Character!
          </Button>
        </Flex>
      </Box>
    </form>
  );
}

export default page;
