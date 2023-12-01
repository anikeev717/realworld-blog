import { ErrorMessage } from '../../components/error-message/error-message';
import { useTypedSelector } from '../../hooks/use-typed-selector';

interface IIsErrorStatus {
  children: JSX.Element;
}

export const IsErrorStatus: React.FunctionComponent<IIsErrorStatus> = ({ children }) => {
  const { error } = useTypedSelector((state) => state.status);

  if (error) return <ErrorMessage />;

  return children;
};
