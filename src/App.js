// import { useState } from "react";
import "./App.css";
// import PublicMint from "./PublicMint";
// import WLMint from "./WLMint";
import NavBar from "./NavBar";
import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

function App() {
  /*const [accounts, setAccounts] = useState([]);

  return (
    <div className="App">
      <NavBar accounts={accounts} setAccounts={setAccounts} />
      <PublicMint accounts={accounts} setAccounts={setAccounts} />
      <WLMint accounts={accounts} setAccounts={setAccounts} />
    </div>
  );*/
  return (
    <WagmiConfig config={config}>
      <NavBar />
    </WagmiConfig>
  );
}

export default App;
