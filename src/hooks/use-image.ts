import { useEffect, useState } from 'react';

import { getValidImageSrc } from '../services/get-valid-image-src';
import avatarDefaultImage from '../assets/images/avatar.svg';

export const useImage = (image: string) => {
  const [src, setSrc] = useState<string>(avatarDefaultImage);

  useEffect(() => {
    if (image !== 'https://static.productionready.io/images/smiley-cyrus.jpg') {
      getValidImageSrc(image).then((data) => (data ? setSrc(image) : setSrc(avatarDefaultImage)));
    }
  }, []);

  return src;
};
