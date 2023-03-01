import { useEffect } from "react";
import { useTokenProof } from "./lib";

export default function App() {
  const { login, setEvents } = useTokenProof();
  useEffect(() => {
    setEvents({
      onNonce: () => console.log("the nonce"),
      onVerify: () => console.log("the verify"),
    });
  });
  return <button onClick={login}>Auth with Tokenproof</button>;
}
