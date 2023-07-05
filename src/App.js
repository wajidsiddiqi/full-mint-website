import { useState } from "react";
import "./App.css";
import PublicMint from "./PublicMint";
import WLMint from "./WLMint";
import NavBar from "./NavBar";

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="App">
      <NavBar accounts={accounts} setAccounts={setAccounts} />
      <PublicMint accounts={accounts} setAccounts={setAccounts} />
      <WLMint accounts={accounts} setAccounts={setAccounts} />
    </div>
  );
}

export default App;
