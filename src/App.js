import React from "react";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { sepolia } from "wagmi/chains";
import "./App.css";
import PublicMint from "./components/PublicMint";
import NavBar from "./components/NavBar";
import Team from "./components/Team";
import Roadmap from "./components/Roadmap";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Fade from "react-reveal/Fade";

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
            <Fade bottom>
              <Team name="team" />
            </Fade>
          </div>
          <div className="bg-image img3">
            <Fade bottom>
              <Roadmap name="roadmap" />
            </Fade>
          </div>
          <ScrollToTopButton />
        </ConnectKitProvider>
      </WagmiConfig>
    </div>
  );
};

export default App;
