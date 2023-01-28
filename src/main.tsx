import ReactDOM from "react-dom/client";
import App from "./App";
import { TokenProofProvider } from "./lib";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<TokenProofProvider
		config={{
			appId: "",
			webhook: "",
			env: "development",
		}}
	>
		<App />
	</TokenProofProvider>
);
