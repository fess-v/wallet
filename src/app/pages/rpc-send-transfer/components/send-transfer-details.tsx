import { truncateMiddle } from '@stacks/ui-utils';
import { HStack, Stack, styled } from 'leather-styles/jsx';

interface SendTransferDetailsProps {
  address: string;
  amount: string;
  currentAddress: string;
}
export function SendTransferDetails({ address, amount, currentAddress }: SendTransferDetailsProps) {
  return (
    <Stack
      border="4px solid"
      borderColor="accent.border-default !important"
      borderRadius="16px"
      gap="space.04"
      p="space.05"
      width="100%"
    >
      <HStack alignItems="center" gap="space.04" justifyContent="space-between">
        <styled.span textStyle="caption.01">From</styled.span>
        <styled.span textStyle="label.01">{truncateMiddle(currentAddress)}</styled.span>
      </HStack>
      <HStack alignItems="center" gap="space.04" justifyContent="space-between">
        <styled.span textStyle="caption.01">To</styled.span>
        <styled.span textStyle="label.01">{truncateMiddle(address)}</styled.span>
      </HStack>
      <HStack alignItems="center" gap="space.04" justifyContent="space-between">
        <styled.span textStyle="caption.01">Amount</styled.span>
        <styled.span textStyle="label.01">{amount}</styled.span>
      </HStack>
    </Stack>
  );
}
