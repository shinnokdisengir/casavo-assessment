import React, {
  FunctionComponent,
  HTMLProps,
  useCallback,
  useState,
} from "react";
import keys from "lodash/keys";
import difference from "lodash/difference";
import { RouteComponentProps, useHistory, useParams } from "react-router-dom";
import { useData } from "../core/Data";
import styled from "styled-components";
import { v1 } from "uuid";

interface Props extends HTMLProps<HTMLDivElement>, RouteComponentProps {}

const UserDetail: FunctionComponent<Props> = ({ className }) => {
  const { addUser, updateUser, checkUser, users } = useData();
  const { location, push, goBack } = useHistory();
  const isCreation = location.pathname.split("/")[1] === "create";
  const params = useParams() as any;

  const [name, setName] = useState<string>(isCreation ? "" : params.name);
  const [currentFriend, selectFriend] = useState<string>();
  const [friends, setFriends] = useState<Array<string>>(
    isCreation ? [] : users[params.name]
  );
  const [error, setError] = useState<boolean>(false);

  const handleSave = useCallback(() => {
    if (error) return;
    if (isCreation) addUser(name);
    else updateUser(name, friends);
    goBack();
  }, [addUser, error, friends, goBack, isCreation, name, updateUser]);

  const handleWriting = useCallback(
    (event) => {
      setError(checkUser(event.target.value));
      setName(event.target.value);
    },
    [checkUser]
  );

  const handleChangeFriend = useCallback((event) => {
    selectFriend(event.target.value);
  }, []);

  const handleSelectFriend = useCallback(() => {
    if (!currentFriend) return;
    setFriends((old) => old.concat(currentFriend));
  }, [currentFriend]);

  const handleRemoveFriend = useCallback((name) => {
    setFriends((old) => old.filter((f) => f !== name));
  }, []);

  const handleCreateFriend = useCallback(() => push(`/create/${v1()}`), [push]);

  return (
    <div className={className}>
      <h2>{isCreation ? "New User" : "Edit User"}</h2>
      <div>
        <input
          value={name}
          onChange={handleWriting}
          placeholder="User name"
        ></input>
      </div>
      <div>
        <label className="error">{error ? "Already used!" : null}</label>
      </div>
      <div>
        <h3>Friends</h3>
        <div>
          <button onClick={handleCreateFriend}>+ New friend</button>
        </div>
        <select value={currentFriend} onChange={handleChangeFriend}>
          {difference(keys(users), friends, [params.name]).map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
        <div>
          <button onClick={handleSelectFriend}>Select</button>
        </div>
      </div>
      {friends.map((f) => (
        <div key={f}>
          <div>
            {f}
            <button onClick={() => handleRemoveFriend(f)}>-</button>
          </div>
        </div>
      ))}
      <button className="main-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default styled(UserDetail)`
  .error {
    color: red;
    font-size: smaller;
  }
`;
