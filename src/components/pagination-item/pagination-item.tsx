import React from 'react';
import { Pagination } from 'antd';

import { IPageAction } from '../../types/types';

interface IPaginatiosProps {
  limit: number;
  articlesCount: number;
  page: number;
  onChangeFunc: (page: number) => IPageAction;
}

export const PaginationItem: React.FC<IPaginatiosProps> = ({ limit, articlesCount, page, onChangeFunc }) => (
  <Pagination
    defaultPageSize={limit}
    showSizeChanger={false}
    defaultCurrent={1}
    total={articlesCount}
    current={page}
    onChange={(targetPage: number) => {
      onChangeFunc(targetPage);
    }}
  />
);
