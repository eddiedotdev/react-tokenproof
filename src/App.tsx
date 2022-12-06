import { useTokenProof } from "./lib";

export default function App() {
  const { login } = useTokenProof();
  return <button onClick={login}>Auth with Tokenproof</button>;
}
