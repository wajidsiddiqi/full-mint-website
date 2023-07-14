import "./App.css";
import PublicMint from "./PublicMint";
import NavBar from "./NavBar";
import Team from "./Team";
import Roadmap from "./Roadmap";
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
    <div className="App">
      <WagmiConfig config={config}>
        <ConnectKitProvider theme="rounded">
          <div className="bg-image img1">
            <NavBar />
            <PublicMint />
          </div>
          <div className="bg-image img2">
            <Team />
          </div>
          <div className="bg-image img3">
            <Roadmap />
          </div>
        </ConnectKitProvider>
      </WagmiConfig>
    </div>
  );
};

export default App;
