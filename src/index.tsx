import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "@Qinastha/pulse_library/dist/index.css";
import { LogoLoader } from "@Qinastha/pulse_library";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const App = lazy(() => delay(2500).then(() => import("./App")));

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);
root.render(
	<React.StrictMode>
		<Suspense fallback={<LogoLoader />}>
			<App />
		</Suspense>
	</React.StrictMode>,
);
