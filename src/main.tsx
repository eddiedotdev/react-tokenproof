import ReactDOM from "react-dom/client";
import App from "./App";
import { TokenProofProvider } from "./lib";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TokenProofProvider
    config={{
      appId: "831f8d47-ae31-4322-959d-32e44a7ac563",
      webhook: "",
    }}
  >
    <App />
  </TokenProofProvider>
);
