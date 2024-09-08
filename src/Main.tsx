import React, { useEffect, useState } from "react";
import { Thread, LoginPage, Navbar } from "./Components";
import "./Main.scss";
import { IThread, useAuth } from "./core";
import axios from "axios";

export const Main: React.FC = () => {
	const { isAuthenticated } = useAuth();
	const [threads, setThreads] = useState<IThread[]>([]);
	const [currentThread, setCurrentThread] = useState<IThread | null>(null);
	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchThreads = async () => {
			try {
				const response = await axios.get(
					"http://localhost:4000/api/assistant/all",
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + token,
						},
					},
				);
				if (response?.data?.value) {
					const fetchedThreads = response.data.value as IThread[];
					setThreads(fetchedThreads);
					if (fetchedThreads.length > 0) {
						setCurrentThread(fetchedThreads[0]);
					}
				} else {
					console.error("Failed to fetch threads.");
				}
			} catch (err) {
				console.error("Error fetching threads:", err);
			}
		};

		if (token) {
			fetchThreads();
		}
	}, [token]);

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
						<Navbar
							threads={threads}
							token={token ?? ""}
							currentThread={currentThread}
							setThreads={setThreads}
							setCurrentThread={setCurrentThread}
						/>
					</div>
				</header>

				<main>
					<div className="main--container glassmorphism">
						<Thread
							currentThread={currentThread}
							token={token ?? ""}
							setCurrentThread={setCurrentThread}
						/>
					</div>
				</main>
			</div>
		</div>
	);
};
