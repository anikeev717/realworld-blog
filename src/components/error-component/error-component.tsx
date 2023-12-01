import React from 'react';
import { Alert } from 'antd';

import classes from './error-component.module.scss';

export const ErrorComponent: React.FC = () => (
  <div className={classes.message}>
    <Alert message="Error" description="Something goes wrong!" type="error" showIcon />
  </div>
);
