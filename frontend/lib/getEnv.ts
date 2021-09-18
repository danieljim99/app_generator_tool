import { useDeno } from 'aleph/react';

const getEnv = (key: string) => {
  return useDeno(() => Deno.env.get(key)) || "";
};

export default getEnv;