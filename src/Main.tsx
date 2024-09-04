import React from "react";
import { Conversation, LoginPage, Navbar } from "./Components";
import "./Main.scss";
import { useAuth } from "./core/utilities/AuthContext";

export const Main: React.FC = () => {
	const { isAuthenticated } = useAuth();

	return (
		<div className={isAuthenticated ? "" : "fullscreen-overlay"}>
			<div className="core--container">
				{!isAuthenticated && (
					<div className="popup--container glassmorphism">
						<LoginPage />
					</div>
				)}

				<header>
					<div className="header--container glassmorphism">
						<Navbar />
					</div>
				</header>

				<main>
					<div className="main--container glassmorphism">
						<Conversation />
					</div>
				</main>
			</div>
		</div>
	);
};
