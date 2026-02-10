import DataTable from "./components/DataTable/DataTable";
import users from "./data/users";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Пользователи</h1>
      </header>
      <DataTable data={users} />
    </div>
  );
}

export default App;
