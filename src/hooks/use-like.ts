import { useEffect, useState } from 'react';

import { TArticleCurrent } from '../types/types';

export const useLike = (currentArticle: TArticleCurrent, slug: string, favorited: boolean, favoritesCount: number) => {
  const [like, setLike] = useState<boolean>(favorited);
  const [likeCount, setLikeCount] = useState<number>(favoritesCount);

  useEffect(() => {
    if (currentArticle) {
      const { favorited: curFavorited, slug: curSlug, favoritesCount: curCount } = currentArticle;
      if (slug === curSlug) {
        setLike(curFavorited);
        setLikeCount(curCount);
      }
    }
  }, [currentArticle]);

  return { like, likeCount };
};
