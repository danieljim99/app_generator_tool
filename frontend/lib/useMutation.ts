import { useDeno } from 'framework/react';
import { getEnv } from '~/lib/index.ts';

const useMutation = (mutation: string) => {
  const apiEndpoint = getEnv("API_URL");

  const response = useDeno(async () => await fetch(
    apiEndpoint, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"query": `mutation${mutation}`})
    }
  ));
    
  const obj = useDeno(async () => await response.json());

  return obj?.data;
};

export default useMutation;