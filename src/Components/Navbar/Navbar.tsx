import React from "react";
import "./Navbar.scss";
import { IThread } from "../../core";
import axios from "axios";

interface NavbarProps {
	threads: IThread[];
	token: string;
	setThreads: (threads: IThread[]) => void;
	setCurrentThread: (thread: IThread) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
	threads,
	token,
	setThreads,
	setCurrentThread,
}) => {
	const handleNewThread = async () => {
		try {
			const response = await axios.post(
				"http://localhost:4000/api/assistant",
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
				},
			);
			if (response?.data?.value) {
				const newThread = response.data.value as IThread;
				setThreads([...threads, newThread]);
				setCurrentThread(newThread);
			}
		} catch (err: any) {
			console.error(err);
		}
	};

	return (
		<div className="navbar--container ">
			<div className="navbar--container-title glassmorphism">
				<h3>Conversations list:</h3>
				<button onClick={handleNewThread}>Create</button>
			</div>
			<div className="navbar--container-conversations glassmorphism">
				{threads.map(thread => (
					<div
						key={thread._id}
						className="conversation"
						onClick={() => setCurrentThread(thread)}>
						<h6>{thread.title}</h6>
					</div>
				))}
			</div>
		</div>
	);
};
