import React from 'react';
import { Alert } from 'antd';

import classes from './error.module.scss';

export const ErrorMessage: React.FC = () => (
  <div className={classes.message}>
    <Alert message="Error" description="Something goes wrong!" type="error" showIcon />
  </div>
);
