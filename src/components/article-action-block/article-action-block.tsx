import { Button } from 'antd';

import { ArticleDeleteBlock } from '../article-delete-block/article-delete-block';

import classes from './article-action-block.module.scss';

interface IArticleActionBlock {
  onConfirm: () => void;
  onClick: () => void;
}

export const ActionActionBlock: React.FunctionComponent<IArticleActionBlock> = ({ onConfirm, onClick }) => {
  return (
    <div className={classes['button-wrapper']}>
      <ArticleDeleteBlock
        onConfirm={() => {
          onConfirm();
        }}
      />
      <Button
        style={{
          borderColor: 'var(--success-color, #52C41A)',
          color: 'var(--success-color, #52C41A)',
          marginLeft: '12px',
        }}
        onClick={() => {
          onClick();
        }}
      >
        Edit
      </Button>
    </div>
  );
};
