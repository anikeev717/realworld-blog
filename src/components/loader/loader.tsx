import React from 'react';
import { Spin } from 'antd';

import classes from './loader.module.scss';

export const Loader: React.FC = () => (
  <Spin tip="Загрузка..." size="small">
    <div className={classes.loader} />
  </Spin>
);
