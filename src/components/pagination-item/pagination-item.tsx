import React from 'react';
import { Pagination } from 'antd';

export const PaginationItem: React.FC = () => (
  <Pagination
    defaultPageSize={5}
    showSizeChanger={false}
    defaultCurrent={1}
    total={1}
    current={1}
    onChange={() => {}}
    hideOnSinglePage
  />
);
