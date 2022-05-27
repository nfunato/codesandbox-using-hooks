import "./styles.css";
import { UserCard } from "./components/UserCard";
import { useAllUsers } from "./hooks/useAllUsers";

const style = {
  border: "solid 1px #ccc",
  borderRadius: "8px",
  padding: "0 16px",
  margin: "8px"
};

export default function App() {
  // useAllUsersフックを他のcallerから使った場合、
  // 返り値の状態 userProfiles/loading等は、そのcallerに固有のものとなる
  // ことが重要と考えられる
  const { getUsers, userProfiles, loading, error } = useAllUsers();

  const onClickFetchData = () => getUsers();

  // Loading... の表示中が遷移中に現れて消えるロジックは
  // 下記コードでは自明ではないように思われる
  return (
    <div className="App" style={style}>
      <button onClick={onClickFetchData}>データ取得</button>
      <br />
      {error ? (
        <p style={{ color: "red" }}>データの取得に失敗しました</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {userProfiles.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
