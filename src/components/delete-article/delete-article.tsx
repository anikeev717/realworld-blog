import React from 'react';
import { Button, Popconfirm } from 'antd';

interface IDeleteArticleProps {
  onConfirm: () => void;
}

export const DeleteArticle: React.FC<IDeleteArticleProps> = ({ onConfirm }) => (
  <Popconfirm
    // title="Delete the task"
    description="Are you sure to delete this article?"
    onConfirm={() => {
      onConfirm();
    }}
    // onCancel={cancel}
    placement="right"
    okText="Yes"
    cancelText="No"
    title={undefined}
  >
    <Button danger>Delete</Button>
  </Popconfirm>
);
