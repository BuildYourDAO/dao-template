import { Enum } from '@polkadot/types-codec';

export interface ApiChainProps {
  genesisHash: `0x${string}`;
  systemName: string;
  systemVersion: string;
  systemChainType: ChainType;
  systemChain: string;
  tokenDecimals: number;
  tokenSymbol: string;
}

export interface ChainType extends Enum {
  readonly isDevelopment: boolean;
  readonly isLocal: boolean;
  readonly isLive: boolean;
  readonly isCustom: boolean;
  readonly asCustom: Text;
  readonly type: 'Development' | 'Local' | 'Live' | 'Custom';
}
