import { Suspense } from 'react';

import { TransactionRequestSelectors } from '@tests/selectors/requests.selectors';
import { useFormikContext } from 'formik';

import { HIGH_FEE_AMOUNT_STX } from '@shared/constants';
import { StacksTransactionFormValues } from '@shared/models/form.model';
import { isEmpty } from '@shared/utils';

import { useDrawers } from '@app/common/hooks/use-drawers';
import { LoadingKeys, useLoading } from '@app/common/hooks/use-loading';
import { ButtonProps, LeatherButton } from '@app/components/button/button';
import { useTransactionError } from '@app/features/stacks-transaction-request/hooks/use-transaction-error';

function BaseConfirmButton(props: ButtonProps): React.JSX.Element {
  return (
    <LeatherButton fullWidth mt="space.04" type="submit" {...props}>
      Confirm
    </LeatherButton>
  );
}

export function SubmitAction() {
  const { handleSubmit, values, validateForm } = useFormikContext<StacksTransactionFormValues>();
  const { isShowingHighFeeConfirmation, setIsShowingHighFeeConfirmation } = useDrawers();
  const { isLoading } = useLoading(LoadingKeys.SUBMIT_TRANSACTION);
  const error = useTransactionError();

  const isDisabled = !!error || Number(values.fee) < 0;

  const onConfirmTransaction = async () => {
    // Check for errors before showing the high fee confirmation
    const formErrors = await validateForm();
    if (isEmpty(formErrors) && Number(values.fee) > HIGH_FEE_AMOUNT_STX) {
      return setIsShowingHighFeeConfirmation(!isShowingHighFeeConfirmation);
    }
    handleSubmit();
  };

  return (
    <Suspense fallback={<BaseConfirmButton aria-busy={isLoading} disabled={isDisabled} />}>
      <BaseConfirmButton
        aria-busy={isLoading}
        data-testid={TransactionRequestSelectors.BtnConfirmTransaction}
        disabled={isDisabled}
        onClick={onConfirmTransaction}
      >
        Confirm
      </BaseConfirmButton>
    </Suspense>
  );
}
