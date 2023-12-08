import React, { Component, ReactNode } from 'react';

import { IStatusSuccess } from '../types/types';
import { ErrorComponent } from '../components/error-component/error-component';

interface IsErrorStatusProps {
  children: ReactNode;
  serverError: boolean;
  path: string;
  clearServerError: () => IStatusSuccess;
}

interface IsErrorStatusState {
  hasError: boolean;
}

export class IsErrorStatus extends Component<IsErrorStatusProps, IsErrorStatusState> {
  public state: IsErrorStatusState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): IsErrorStatusState {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: Readonly<IsErrorStatusProps>): void {
    const { path, clearServerError } = this.props;
    if (prevProps.path !== path) {
      this.setState({ hasError: false });
      clearServerError();
    }
  }

  // public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  //   console.error('Uncaught error:', error, errorInfo);
  // }

  public render() {
    const { hasError } = this.state;
    const { children, serverError } = this.props;
    if (hasError || serverError) {
      return <ErrorComponent />;
    }

    return children;
  }
}
