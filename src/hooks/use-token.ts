import { useEffect } from 'react';

import { getToken } from '../services/token-functions';
import { userRequestGet } from '../services/real-world-blog-api';

import { useActions } from './use-actions';

export const useToken = () => {
  const { userAsync } = useActions();

  useEffect(() => {
    const cookieToken = getToken();
    if (cookieToken) userAsync(userRequestGet(cookieToken));
  }, []);
};
