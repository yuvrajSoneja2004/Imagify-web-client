import { ActionIcon, Box, TextInput, rem } from '@mantine/core';
import { IconArrowRight, IconSend, IconSendOff } from '@tabler/icons-react';
import React from 'react';

type Props = {};

function ChatBody({}: Props) {
  return (
    <Box>
      <Box mt={15} h={400} style={{ overflowY: 'scroll' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur repudiandae corrupti
        repellat impedit voluptate officia magnam maiores possimus ipsa accusantium? Assumenda sit
        exercitationem iste sint quaerat obcaecati amet dolor sed odit corporis! Molestiae
        asperiores laudaolorem! Sed esse expedita, ex tempore sunt, consequuntur repellendus odio
        facilis sint est inventore. Porro tenetur eaque nisi animi amet repellendus et incidunt
        voluptas suscipit veritatis. Ducimus iusto accusantium eius numquam alias.
      </Box>
      <TextInput
        mt={15}
        radius="xl"
        size="md"
        placeholder="Type a message"
        rightSectionWidth={42}
        rightSection={
          <ActionIcon size={32} radius="xl" color={'blue'} variant="filled">
            <IconSend style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        }
      />
    </Box>
  );
}

export default ChatBody;
