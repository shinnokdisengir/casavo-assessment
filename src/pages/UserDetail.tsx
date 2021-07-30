import difference from "lodash/difference";
import keys from "lodash/keys";
import React, {
  FunctionComponent,
  HTMLProps,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { RouteComponentProps, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { v1 } from "uuid";
import { useData } from "../core/Data";

interface Props extends HTMLProps<HTMLDivElement>, RouteComponentProps {}

const UserDetail: FunctionComponent<Props> = ({ className }) => {
  const { addUser, updateUser, checkUser, users } = useData();
  const { location, push, goBack, replace } = useHistory();
  const isCreation = location.pathname.split("/")[1] === "create";
  const params = useParams() as any;

  const [name, setName] = useState<string>("");
  const [friends, setFriends] = useState<Array<string>>([]);
  const [error, setError] = useState<boolean>(false);

  const selectElement = useRef() as RefObject<any>;

  const handleSave = useCallback(() => {
    if (error) return;
    if (!name) return;
    if (isCreation) addUser(name, friends);
    else updateUser(params.name, name, friends);
    goBack();
  }, [
    addUser,
    error,
    friends,
    goBack,
    isCreation,
    name,
    params.name,
    updateUser,
  ]);

  const handleWriting = useCallback(
    (event) => {
      setError(checkUser(event.target.value));
      setName(event.target.value);
    },
    [checkUser]
  );

  const handleSelectFriend = useCallback(() => {
    const currentFriend =
      selectElement && selectElement.current && selectElement.current.value;
    if (!currentFriend) return;
    setFriends((old) => old.concat(currentFriend));
  }, []);

  const handleRemoveFriend = useCallback((name) => {
    setFriends((old) => old.filter((f) => f !== name));
  }, []);

  const handleCreateFriend = useCallback(() => {
    const sessionId = v1();
    push(`/create/${sessionId}`, [
      ...(location.state as any),
      {
        name,
        friends,
      },
    ]);
  }, [friends, location.state, name, push]);

  useEffect(() => {
    if (!isCreation && !users[params.name]) replace("/", []);
    setName(!isCreation ? params.name : "");
    setFriends(!isCreation ? users[params.name] : []);
  }, [isCreation, params.name, replace, users]);

  console.log(`location.state`, location.state);

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
        <select ref={selectElement}>
          {difference(keys(users), friends, [params.name]).map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
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
