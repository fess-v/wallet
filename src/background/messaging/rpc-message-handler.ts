import { RpcErrorCode } from '@btckit/types';

import { WalletRequests, makeRpcErrorResponse } from '@shared/rpc/rpc-methods';

import { rpcSignStacksTransaction } from '@background/messaging/rpc-methods/sign-stacks-transaction';

import { getTabIdFromPort } from './messaging-utils';
import { rpcAcceptBitcoinContractOffer } from './rpc-methods/accept-bitcoin-contract';
import { rpcGetAddresses } from './rpc-methods/get-addresses';
import { rpcSendTransfer } from './rpc-methods/send-transfer';
import { rpcSignMessage } from './rpc-methods/sign-message';
import { rpcSignPsbt } from './rpc-methods/sign-psbt';
import { rpcSupportedMethods } from './rpc-methods/supported-methods';

export async function rpcMessageHandler(message: WalletRequests, port: chrome.runtime.Port) {
  switch (message.method) {
    case 'getAddresses': {
      await rpcGetAddresses(message, port);
      break;
    }

    case 'signMessage': {
      await rpcSignMessage(message, port);
      break;
    }

    case 'sendTransfer': {
      await rpcSendTransfer(message, port);
      break;
    }

    case 'signPsbt': {
      await rpcSignPsbt(message, port);
      break;
    }

    case 'signStacksTransaction': {
      await rpcSignStacksTransaction(message, port);
      break;
    }

    case 'supportedMethods': {
      rpcSupportedMethods(message, port);
      break;
    }

    case 'acceptBitcoinContractOffer': {
      await rpcAcceptBitcoinContractOffer(message, port);
      break;
    }

    default:
      chrome.tabs.sendMessage(
        getTabIdFromPort(port),
        makeRpcErrorResponse('' as any, {
          id: message.id,
          error: {
            code: RpcErrorCode.METHOD_NOT_FOUND,
            message: `"${message.method}" is not supported. Try running \`.request('supportedMethods')\` to see what Leather can do, or check out our developer documentation at https://leather.gitbook.io/developers/home/welcome`,
          },
        })
      );
      break;
  }
}
