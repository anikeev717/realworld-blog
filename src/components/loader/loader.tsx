import React from 'react';
import { Spin } from 'antd';

import classes from './loader.module.scss';

export const Loader: React.FC = () => (
  <Spin wrapperClassName={classes.loader} tip="Loading..." size="large">
    <div />
  </Spin>
);
