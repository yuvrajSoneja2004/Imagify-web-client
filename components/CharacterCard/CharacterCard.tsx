import React from 'react';
import S from './CharacterCard.module.css';
import { Flex, Menu, Select, Text } from '@mantine/core';
import { IconBrandWechat, IconDotsVertical } from '@tabler/icons-react';
import Link from 'next/link';

type Props = {};

function CharacterCard({}: Props) {
  return (
    <div className={S.card}>
      <img
        src="https://characterai.io/i/400/static/avatars/uploaded/2022/10/6/qHO2fZ4bR4wEx6I2DgrwrfVb1z8KtKZviuQ6lPqCN_w.webp"
        alt="lol"
        style={{ borderRadius: '15px' }}
      />
      <Text fw={700}>Saitama</Text>
      <Text fz={13} lh={1} mt={8}>
        Hey , i am just a hero for fun
      </Text>
      <Flex justify={'space-between'} align={'center'} w={'100%'} mt={23}>
        <Text fz={13} fs={'italic'} c={'dimmed'} className={S.creator}>
          <Link
            href={'/creator/:id'}
            style={{ textDecoration: 'none', color: 'white', opacity: '.4' }}
          >
            @creator
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
