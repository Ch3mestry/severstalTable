import DataTable from "./components/DataTable/DataTable";
import users from "./data/users";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Users</h1>
      </header>
      <DataTable data={users} />
    </div>
  );
}

export default App;
