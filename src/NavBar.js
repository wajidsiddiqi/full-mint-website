import { useAccount, useDisconnect } from "wagmi";
import { ConnectKitButton } from "connectkit";

function NavBar() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {/*Left side - Social media icons */}
      <div>Discord</div>
      <div>Twitter</div>
      <div>OpenSea</div>

      {/*Right side - sections and connect button */}
      <div>Mint</div>
      <div>About</div>
      <div>Team</div>

      {/*Connect*/}
      {isConnected ? (
        <button onClick={() => disconnect()}>Disconnect</button>
      ) : (
        <ConnectKitButton />
      )}
    </div>
  );
}

export default NavBar;
