import React from "react";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { sepolia } from "wagmi/chains";
import "./App.css";
import PublicMint from "./PublicMint";
import NavBar from "./NavBar";
import Team from "./Team";
import Roadmap from "./Roadmap";
import ScrollToTopButton from "./ScrollToTopButton";

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
            <PublicMint name="mint" />
          </div>
          <div className="bg-image img2">
            <Team name="team" />
          </div>
          <div className="bg-image img3">
            <Roadmap name="roadmap" />
          </div>
          <ScrollToTopButton />
        </ConnectKitProvider>
      </WagmiConfig>
    </div>
  );
};

export default App;
