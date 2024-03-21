import { useEffect, useState } from 'react';
import { BN_HUNDRED } from 'src/helpers/bn';
import type { BN, InputMode, UIGas } from 'src/types';
import * as Yup from 'yup';

const schema = Yup.number()
  .positive('Value must be positive')
  .min(2)
  .required();

export const useWeight = (estimation?: BN): UIGas => {
  const [limit, setLimit] = useState<BN>(estimation ?? BN_HUNDRED);
  const [mode, setMode] = useState<InputMode>('estimation');
  const [errorMsg, setErrorMsg] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [text, setText] = useState(limit.toString());

  useEffect(() => {
    if (
      mode === 'estimation' &&
      estimation &&
      !estimation.eq(limit) &&
      !estimation.isZero()
    ) {
      setText(estimation.toString());
      setLimit(estimation);
    }
  }, [estimation, limit, mode, setLimit]);

  useEffect(() => {
    async function validate() {
      try {
        const valid = await schema.validate(text);
        if (valid) {
          setIsValid(true);
          setErrorMsg('');
        }
      } catch (err) {
        const { errors } = (err as { errors: string[] }) ?? { errors: [''] };
        setIsValid(false);
        setErrorMsg(errors[0]);
      }
    }
    validate().catch((e) => console.error(e));
  }, [text]);

  return {
    isValid,
    limit,
    setLimit,
    mode,
    setMode,
    errorMsg,
    setErrorMsg,
    setIsValid,
    text,
    setText,
  };
};
