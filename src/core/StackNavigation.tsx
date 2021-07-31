import {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { f } from "../utilities";

interface Context {
  stack: Array<ReactNode>;
  pushPage: (page: ReactNode) => void;
  popPage: () => void;
}

const StackNavigationContext = createContext<Context>({
  stack: [],
  pushPage: () => {},
  popPage: () => {},
});
const { Provider, Consumer } = StackNavigationContext;

const StackNavigationProvider: FunctionComponent = ({ children }) => {
  const [stack, setStack] = useState<Array<ReactNode>>([]);

  const pushPage = useCallback((page: ReactNode) => {
    setStack((stack) => [...stack, page]);
  }, []);
  const popPage = useCallback(() => {
    setStack((stack) => stack.slice(0, stack.length - 1));
  }, []);
  const actions = {
    pushPage,
    popPage,
  };

  return (
    <Provider value={{ ...actions, stack }}>
      {f(children)({ ...actions })}
    </Provider>
  );
};

export const StackNavigationConsumer = Consumer;
export const useStackNavigation = () => useContext(StackNavigationContext);

export default StackNavigationProvider;
