import "./App.css";
import PublicMint from "./PublicMint";
// import WLMint from "./WLMint";
import NavBar from "./NavBar";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { sepolia } from "wagmi/chains";

const alchemyId = process.env.SEPOLIA_PRIVATE_KEY;
const walletConnectProjectId = process.env.WALLETCONNECT_PROJECT_ID;
const chains = [sepolia];

const config = createConfig(
  getDefaultConfig({
    appName: "RoboPunksNFT",
    alchemyId,
    walletConnectProjectId,
    chains,
  })
);

const App = () => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme="midnight">
        <NavBar />
        <PublicMint />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default App;
