import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalContextProviderLayout from "./components/layout/GlobalContextProviderLayout";

// Query Library
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Router>
		<QueryClientProvider client={queryClient}>
			<GlobalContextProviderLayout>
				<App />
			</GlobalContextProviderLayout>
		</QueryClientProvider>
	</Router>
);
