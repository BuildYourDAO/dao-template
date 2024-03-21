import { ApiPromise } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';

export const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

export function transfer() {
  try {
    // Instantiate the API
    ApiPromise.create().then((api) => {
      // Construct the keyring after the API (crypto has an async init)
      const keyring = new Keyring({ type: 'sr25519' });

      // Add Alice to our keyring with a hard-derivation path (empty phrase, so uses dev)
      const alice = keyring.addFromUri('//Alice');

      // Create an extrinsic, transferring 12345 units to Bob
      const transfer = api.tx.balances.transfer(BOB, 12345);

      // Sign and send the transaction using our account
      transfer.signAndSend(alice, ({ events = [], status }) => {
        if (status.isInBlock) {
          console.log(
            'Transfer included at block hash',
            status.asInBlock.toHex()
          );
          console.log('Events:');
          events.forEach(({ phase, event: { data, method, section } }) => {
            console.log(
              '\t',
              phase.toString(),
              `: ${section}.${method}`,
              data.toString()
            );
          });
          // unsub(); // Unsubscribe the listener when the transfer is included in a block
        } else if (status.isFinalized) {
          console.log(
            'Transfer finalized at block hash',
            status.asFinalized.toHex()
          );
          // unsub(); // Unsubscribe the listener when the transfer is finalized
        }
      });

      console.log('Transfer sent with hash', transfer);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
