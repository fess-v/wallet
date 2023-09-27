import { FiMoreHorizontal } from 'react-icons/fi';

import { Box, IconButton, Stack, Text, color } from '@stacks/ui';
import { HStack } from 'leather-styles/jsx';

import { Caption } from '@app/components/typography';

import { TxAssetItem } from './tx-asset-item';

interface EventCardProps {
  actions?: string;
  amount: number | string;
  icon: string;
  isLast?: boolean;
  left?: string;
  message?: string;
  right?: string;
  ticker: string;
  title: string;
}
export function EventCard(props: EventCardProps): React.JSX.Element {
  const { actions, amount, icon, isLast, left, message, right, ticker, title } = props;

  return (
    <>
      <Stack p="base-loose" spacing="base-loose">
        <HStack alignItems="center" justifyContent="space-between" position="relative">
          <Text fontSize={2} fontWeight={500}>
            {title}
          </Text>
          {actions && (
            <IconButton size="24px" icon={FiMoreHorizontal} position="absolute" right={0} />
          )}
        </HStack>
        <TxAssetItem iconString={icon} amount={amount} ticker={ticker} />
        {left || right ? (
          <HStack alignItems="center" justifyContent="space-between">
            {left ? <Caption>{left}</Caption> : <Box />}
            {right && <Caption>{right}</Caption>}
          </HStack>
        ) : null}
      </Stack>
      {message && (
        <Box
          p="base-loose"
          borderTop="1px solid"
          borderColor={color('border')}
          borderBottom={!isLast ? '4px solid' : 'unset'}
          borderBottomColor={color('border')}
        >
          <Caption>{message}</Caption>
        </Box>
      )}
    </>
  );
}
