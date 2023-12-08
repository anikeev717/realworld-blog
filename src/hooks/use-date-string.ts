import { format } from 'date-fns';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export const useDateString = (createdAt: string) => {
  const dateObj = new Date(createdAt);

  const createDateString = (date: Date) => {
    let str: string = 'MMMM d, yyyy';
    const { width } = window.screen;
    if (width <= 480) str = 'MMM d, yyyy';
    if (width <= 360) str = 'MM.dd.yy';
    return format(date, str);
  };

  const [dateString, setDateString] = useState<string>(createDateString(dateObj));
  useEffect(() => {
    const funcDateString = () => setDateString(createDateString(dateObj));
    window.addEventListener('resize', debounce(funcDateString, 500));
    return () => {
      window.removeEventListener('resize', debounce(funcDateString, 500));
    };
  }, [dateString]);

  return dateString;
};
