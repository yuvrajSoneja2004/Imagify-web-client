import React from 'react';
import S from './CharacterCard.module.css';
import { Flex, Menu, Select, Text, useComputedColorScheme } from '@mantine/core';
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
    views,
    greeting,
  } = info;
  console.log('Ammaku side diyo re', info);
  const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  return (
    <div
      className={S.card}
      style={{
        backgroundColor: colorScheme == 'dark' ? '#393B3B' : '#fff',
        boxShadow: colorScheme == 'dark' ? '' : 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      }}
      onClick={() => {
        navigate.push(`/chat?id=${_id}`);
      }}
    >
      {/* // TODO: Change img tag to div and give backgroundImage instead on src */}
      <img
        src={avatar}
        alt="lol"
        style={{ borderRadius: '15px' }}
        width={1500}
        height={1500}
        onError={(e) => {
          e.target.src = 'http://via.placeholder.com/99x99'; // Fallback image URL
        }}
      />
      <Text fw={700}>{name === '' ? 'NOT_DEFINED' : name}</Text>
      <Text fz={12} lh={1.2} mt={8} pl={5}>
        {greeting}
      </Text>
      <Flex justify={'space-between'} align={'center'} w={'100%'} mt={23}>
        <Text fz={13} fs={'italic'} c={'dimmed'} className={S.creator}>
          <Link
            href={'/creator/:id'}
            style={{
              textDecoration: 'none',
              color: colorScheme == 'dark' ? '#fff' : '#000',
              opacity: '.4',
            }}
          >
            @{!username ? 'Unknown' : username}
          </Link>
        </Text>
        <Flex align={'center'} gap={8}>
          <Flex align={'center'} gap={2}>
            <IconBrandWechat size={16} />
            <Text fz={12}>{views.length}</Text>
          </Flex>
          <IconDotsVertical size={16} />
        </Flex>
      </Flex>
    </div>
  );
}

export default CharacterCard;
