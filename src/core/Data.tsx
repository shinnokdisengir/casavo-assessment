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

interface User {
  name: string;
  friends: Array<string>;
}

type Users = Record<string, User>;

const DataContext = createContext<{
  users: Users;
}>({
  users: {},
});
const { Provider, Consumer } = DataContext;

const DataProvider: FunctionComponent = ({ children }) => {
  const [users, setUsers] = useState<Users>({});

  const checkUser = useCallback((name: string) => !!users[name], [users]);
  const addUser = useCallback(
    (user: User) => setUsers((users) => ({ ...users, user })),
    []
  );
  const removeUser = useCallback(
    (user: string) => setUsers((users) => omit(users, user)),
    []
  );
  const addFriend = useCallback(
    (user: string, friend: string) =>
      setUsers((users) => ({
        ...users,
        [user]: {
          ...users[user],
          friends: users[user].friends.concat(friend),
        },
      })),
    []
  );
  const removeFriend = useCallback(
    (user: string, friend: string) =>
      setUsers((users) => ({
        ...users,
        [user]: {
          ...users[user],
          friends: users[user].friends.filter((f) => f !== friend),
        },
      })),
    []
  );

  useEffect(() => {
    const session = localStorage.getItem(SessionKey);
    if (session) setUsers(JSON.parse(session));
  }, []);

  const actions = {
    checkUser,
    addUser,
    removeUser,
    addFriend,
    removeFriend,
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