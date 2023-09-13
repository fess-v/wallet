import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { bytesToHex } from '@noble/hashes/utils';

import { finalizePsbt } from '@shared/actions/finalize-psbt';
import { RouteUrls } from '@shared/route-urls';

import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';
import { SignPsbtArgs } from '@app/common/psbt/requests';
import { usePsbtRequestSearchParams } from '@app/common/psbt/use-psbt-request-params';
import { usePsbtSigner } from '@app/features/psbt-signer/hooks/use-psbt-signer';

export function usePsbtRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const analytics = useAnalytics();
  const navigate = useNavigate();
  const { appName, origin, payload, requestToken, signAtIndex, tabId } =
    usePsbtRequestSearchParams();
  const { signPsbt, getRawPsbt, getPsbtAsTransaction } = usePsbtSigner();

  return useMemo(() => {
    return {
      appName,
      indexesToSign: signAtIndex,
      isLoading,
      getRawPsbt,
      origin,
      psbtHex: payload.hex,
      onDenyPsbtSigning() {
        void analytics.track('request_psbt_cancel');
        finalizePsbt({
          data: 'PSBT request was canceled',
          requestPayload: requestToken,
          tabId,
        });
      },
      onSignPsbt({ inputs }: SignPsbtArgs) {
        setIsLoading(true);
        void analytics.track('request_sign_psbt_submit');

        const tx = getPsbtAsTransaction(payload.hex);

        try {
          signPsbt({ indexesToSign: signAtIndex, inputs, tx });
        } catch (e) {
          return navigate(RouteUrls.RequestError, {
            state: { message: e instanceof Error ? e.message : '', title: 'Failed to sign' },
          });
        }

        const psbt = tx.toPSBT();

        setIsLoading(false);

        finalizePsbt({
          data: { hex: bytesToHex(psbt) },
          requestPayload: requestToken,
          tabId,
        });
      },
    };
  }, [
    appName,
    signAtIndex,
    isLoading,
    getRawPsbt,
    origin,
    payload.hex,
    analytics,
    requestToken,
    tabId,
    getPsbtAsTransaction,
    signPsbt,
    navigate,
  ]);
}
