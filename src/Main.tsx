import React, { useEffect, useState } from "react";
import { Thread, LoginPage, Navbar } from "./Components";
import "./Main.scss";
import { IThread, useAuth } from "./core";
import axios from "axios";
import { useHideNav } from "@Qinastha/pulse_library";

export const Main: React.FC = () => {
	const { isAuthenticated } = useAuth();
	const [threads, setThreads] = useState<IThread[]>([]);
	const [currentThread, setCurrentThread] = useState<IThread | null>(null);
	const token = localStorage.getItem("token");
	const [isNavbarHidden, setIsNavbarHidden] = useState<boolean>(false);

	// Handle touch events for hiding the navbar
	const { handleTouchStart, handleTouchEnd, handleTouchMove } = useHideNav({
		onHide: () => setIsNavbarHidden(true),
		onShow: () => setIsNavbarHidden(false),
	});

	// Fetch threads on component mount or token change
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
			<div className={`core--container ${!isNavbarHidden ? "" : "hidden"}`}>
				{!isAuthenticated && (
					<div className="popup--container glassmorphism">
						<LoginPage />
					</div>
				)}

				<header>
					<div
						className={`header--container ${!isNavbarHidden ? "" : "hidden"}`}>
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
					<div
						className="main--container glassmorphism"
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}>
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
