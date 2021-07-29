import omit from "lodash/omit";
import {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { f } from "../utilities";

const SessionKey = "casavo.data";

type User = Array<string>;

interface Context {
  users: Users;
  checkUser: (name: string) => boolean;
  addUser: (name: string, friends: Array<string>) => void;
  updateUser: (
    oldName: string,
    newName: string,
    friends: Array<string>
  ) => void;
  removeUser: (name: string) => void;
}

type Users = Record<string, User>;

const DataContext = createContext<Context>({
  users: {},
  checkUser: () => false,
  addUser: () => {},
  updateUser: () => {},
  removeUser: () => {},
});
const { Provider, Consumer } = DataContext;

const DataProvider: FunctionComponent = ({ children }) => {
  const [users, setUsers] = useState<Users>({
    pippo: [],
    amico: ["pippo"],
    dottore: ["pippo", "amico"],
    leprecauno: [],
  });

  const checkUser = useCallback((name: string) => !!users[name], [users]);

  const addUser = useCallback(
    (user: string, friends: Array<string>) =>
      setUsers((users) => ({
        ...users,
        [user]: friends,
      })),
    []
  );

  const removeUser = useCallback(
    (user: string) => setUsers((users) => omit(users, user)),
    []
  );

  const updateUser = useCallback(
    (oldName: string, newName: string, friends: Array<string>) =>
      setUsers((users) => ({
        ...omit(users, oldName),
        [newName]: friends,
      })),
    []
  );
  //   const addFriend = useCallback(
  //     (user: string, friend: string) =>
  //       setUsers((users) => ({
  //         ...users,
  //         [user]: users[user].concat(friend),
  //       })),
  //     []
  //   );
  //   const removeFriend = useCallback(
  //     (user: string, friend: string) =>
  //       setUsers((users) => ({
  //         ...users,
  //         [user]: users[user].filter((f) => f !== friend),
  //       })),
  //     []
  //   );

  useEffect(() => {
    const session = localStorage.getItem(SessionKey);
    if (session) setUsers(JSON.parse(session));
  }, []);

  const actions = {
    checkUser,
    addUser,
    removeUser,
    updateUser,
  };

  return (
    <Provider value={{ ...actions, users }}>
      {f(children)({ ...actions })}
    </Provider>
  );
};

export const DataConsumer = Consumer;
export const useData = () => useContext(DataContext);

export default DataProvider;
