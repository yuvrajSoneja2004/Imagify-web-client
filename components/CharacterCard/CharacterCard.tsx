import React from 'react';
import S from './CharacterCard.module.css';
import { Flex, Menu, Select, Text } from '@mantine/core';
import { IconBrandWechat, IconDotsVertical } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  info: any;
};

function CharacterCard({ info }: Props) {
  const navigate = useRouter();
  const {
    _id,
    avatar,
    name,
    createdBy: { username },
    likes,
  } = info;
  return (
    <div
      className={S.card}
      onClick={() => {
        navigate.push(`/chat?id=${_id}`);
      }}
    >
      <img
        src={avatar}
        alt="lol"
        style={{ borderRadius: '15px' }}
        onError={(e) => {
          e.target.src = 'http://via.placeholder.com/99x99'; // Fallback image URL
        }}
      />
      <Text fw={700}>{name === '' ? 'NOT_DEFINED' : name}</Text>
      <Text fz={13} lh={1} mt={8}>
        Hey , i am just a hero for fun
      </Text>
      <Flex justify={'space-between'} align={'center'} w={'100%'} mt={23}>
        <Text fz={13} fs={'italic'} c={'dimmed'} className={S.creator}>
          <Link
            href={'/creator/:id'}
            style={{ textDecoration: 'none', color: 'white', opacity: '.4' }}
          >
            @{username}
          </Link>
        </Text>
        <Flex align={'center'} gap={8}>
          <Flex align={'center'} gap={2}>
            <IconBrandWechat size={16} />
            <Text fz={12}>122k</Text>
          </Flex>
          <IconDotsVertical size={16} />
        </Flex>
      </Flex>
    </div>
  );
}

export default CharacterCard;
