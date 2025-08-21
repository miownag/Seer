import type { matchesType } from '@/typings/modern';
import { useMatches } from '@modern-js/runtime/router';

const usePath = () => {
  const matches = useMatches() as matchesType;
  return matches[1]?.handle?.pathName;
};

export { usePath };
