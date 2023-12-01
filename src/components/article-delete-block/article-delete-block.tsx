import React from 'react';
import { Button, Popconfirm } from 'antd';

interface IDeleteArticleProps {
  onConfirm: () => void;
}

export const ArticleDeleteBlock: React.FC<IDeleteArticleProps> = ({ onConfirm }) => (
  <Popconfirm
    description="Are you sure to delete this article?"
    onConfirm={() => {
      onConfirm();
    }}
    placement="right"
    okText="Yes"
    cancelText="No"
    title={undefined}
  >
    <Button danger>Delete</Button>
  </Popconfirm>
);
