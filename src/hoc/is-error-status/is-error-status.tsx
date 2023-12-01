import { ErrorComponent } from '../../components/error-component/error-component';
import { useTypedSelector } from '../../hooks/use-typed-selector';

interface IIsErrorStatus {
  children: JSX.Element;
}

export const IsErrorStatus: React.FunctionComponent<IIsErrorStatus> = ({ children }) => {
  const { error } = useTypedSelector((state) => state.status);

  if (error) return <ErrorComponent />;

  return children;
};
