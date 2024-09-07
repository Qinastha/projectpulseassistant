import React from "react";
import "@Qinastha/pulse_library/dist/index.css";
import { Main } from "./Main";
import { AuthProvider } from "./core/utilities/AuthContext";

const App: React.FC = () => {
	return (
		<AuthProvider>
			<Main />
		</AuthProvider>
	);
};

export default App;
