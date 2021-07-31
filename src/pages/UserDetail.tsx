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
import styled from "styled-components";
import { v1 } from "uuid";
import { useData } from "../core/Data";
import { useStackNavigation } from "../core/StackNavigation";

interface Props extends HTMLProps<HTMLDivElement> {
  isCreation?: boolean;
  name?: string;
  friends?: Array<string>;
}

const UserDetail: FunctionComponent<Props> = ({
  className,
  isCreation = false,
  name = "",
  friends = [],
}) => {
  const { stack, popPage, pushPage } = useStackNavigation();
  const { addUser, updateUser, checkUser, users } = useData();
  const [editName, setEditName] = useState<string>(name);
  const [editFriends, setEditFriends] = useState<Array<string>>(friends);
  const [error, setError] = useState<boolean>(false);

  const selectElement = useRef() as RefObject<any>;

  const handleSave = useCallback(() => {
    if (error) return;
    if (!name) return;
    if (isCreation) addUser(editName, editFriends);
    else updateUser(name, editName, editFriends);
    popPage();
  }, [
    addUser,
    editFriends,
    editName,
    error,
    isCreation,
    name,
    popPage,
    updateUser,
  ]);

  const handleWriting = useCallback(
    (event) => {
      setError(checkUser(event.target.value));
      setEditName(event.target.value);
    },
    [checkUser]
  );

  const handleSelectFriend = useCallback(() => {
    const currentFriend =
      selectElement && selectElement.current && selectElement.current.value;
    if (!currentFriend) return;
    setEditFriends((old) => old.concat(currentFriend));
  }, []);

  const handleRemoveFriend = useCallback((name) => {
    setEditFriends((old) => old.filter((f) => f !== name));
  }, []);

  const handleCreateFriend = useCallback(() => {
    pushPage(<UserDetail isCreation name="" friends={[]} />);
  }, [pushPage]);

  // useEffect(() => {
  //   if (!isCreation && !users[params.name]) replace("/", []);
  //   setEditName(!isCreation ? params.name : "");
  //   setFriends(!isCreation ? users[params.name] : []);
  // }, [isCreation, params.name, replace, users]);

  // console.log(`location.state`, location.state);

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
          {difference(keys(users), friends, [name]).map((f) => (
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
