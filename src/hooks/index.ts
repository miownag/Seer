import type { matchesType } from '@/typings/modern';
import { useMatches } from '@modern-js/runtime/router';
import { useState } from 'react';

const usePath = () => {
  const matches = useMatches() as matchesType;
  return matches[1]?.handle?.pathName;
};

const useUpdate = () => {
  const [, setState] = useState({});
  return () => {
    setState({});
  };
};

export { usePath, useUpdate };
