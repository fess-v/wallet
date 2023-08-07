import { Suspense, memo } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

import { Box, Stack, StackProps, color } from '@stacks/ui';
import { TransactionSigningSelectors } from '@tests-legacy/page-objects/transaction-signing.selectors';

import { Caption } from '@app/components/typography';
import { TransactionErrorReason } from '@app/features/stacks-transaction-request/components/transaction-error/transaction-error';
import { useTransactionError } from '@app/features/stacks-transaction-request/hooks/use-transaction-error';

function MinimalErrorMessageSuspense(props: StackProps) {
  const error = useTransactionError();

  if (!error) return null;

  const getTitle = () => {
    if (error) {
      switch (error) {
        case TransactionErrorReason.Unauthorized:
          return 'Unauthorized request';
        case TransactionErrorReason.NoContract:
          return 'Contract not found';
        case TransactionErrorReason.InvalidContractAddress:
          return 'Invalid contract address';
        case TransactionErrorReason.StxTransferInsufficientFunds:
        case TransactionErrorReason.FeeInsufficientFunds:
          return 'Insufficient balance';
        case TransactionErrorReason.Generic:
          return 'Something went wrong';
      }
    }
    return null;
  };

  return (
    <Stack
      alignItems="center"
      bg="#FCEEED"
      borderRadius="12px"
      data-testid={TransactionSigningSelectors.TransactionErrorMessage}
      isInline
      p="base"
      width="100%"
      {...props}
    >
      <Box color={color('feedback-error')} strokeWidth={2} as={FiAlertTriangle} />
      <Caption color={color('feedback-error')}>{getTitle()}</Caption>
    </Stack>
  );
}

function MinimalErrorMessageBase(props: StackProps) {
  return (
    <Suspense fallback={<></>}>
      <MinimalErrorMessageSuspense {...props} />
    </Suspense>
  );
}

export const MinimalErrorMessage = memo(MinimalErrorMessageBase);
