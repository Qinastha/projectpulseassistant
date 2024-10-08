import React, { useState } from "react";
import "./Navbar.scss";
import {
	handleDeleteThread,
	handleEditThread,
	handleNewThread,
	IThread,
	ThreadsList,
} from "../../core";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@Qinastha/pulse_library";

interface NavbarProps {
	threads: IThread[];
	token: string;
	currentThread: IThread | null;
	setThreads: (threads: IThread[]) => void;
	setCurrentThread: (thread: IThread | null) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
	threads,
	token,
	currentThread,
	setThreads,
	setCurrentThread,
}) => {
	const { i18n } = useTranslation();
	const [titleValue, setTitleValue] = useState("");
	const [editingId, setEditingId] = useState<string | null>(null);

	const handleTitleEdit = (threadId: string) => {
		if (editingId === threadId) {
			setEditingId(null);
		} else {
			setEditingId(threadId);
			const targetThread = threads.find(thread => thread._id === threadId);
			setTitleValue(targetThread?.title ?? "");
		}
	};

	const handleSelectThread = (threadId: string) => {
		const currentThread = threads.find(
			(thread: IThread) => thread._id === threadId,
		);
		if (currentThread) {
			setCurrentThread(currentThread);
		} else {
			console.error("Failed to find thread.");
		}
	};

	const handleNewThreadClick = async () => {
		try {
			const newThread = await handleNewThread(token);
			setThreads([...threads, newThread]);
			setCurrentThread(newThread);
		} catch (err) {
			console.error(err);
		}
	};

	const handleEditThreadClick = async (
		threadId: string,
		e: React.MouseEvent<HTMLButtonElement>,
	) => {
		e.stopPropagation();
		try {
			const updatedThread = await handleEditThread(threadId, titleValue, token);
			const updatedThreads = threads.map((thread: IThread) =>
				thread._id === updatedThread._id ? updatedThread : thread,
			);
			setThreads(updatedThreads);
			setEditingId(null);
		} catch (err) {
			console.error(err);
		}
	};

	const handleDeleteThreadClick = async (
		threadId: string,
		e: React.MouseEvent<HTMLButtonElement>,
	) => {
		e.stopPropagation();
		try {
			await handleDeleteThread(threadId, token);
			const updatedThreads = threads.filter(
				(thread: IThread) => thread._id !== threadId,
			);
			setThreads(updatedThreads);
			setCurrentThread(null);
		} catch (err) {
			console.error(err);
		}
	};

	const switchLanguage = () => {
		i18n.changeLanguage(i18n.language === "en" ? "ua" : "en");
	};

	return (
		<div className="navbar--container">
			<div className="navbar--container_header">
				<div className="navbar--container-title ">
					<h3>PulseX</h3>
				</div>
				<div className="navbar--container-button">
					<button onClick={handleNewThreadClick}>
						<span className="navbar--container-button-icon">&#43;</span>
					</button>
				</div>
			</div>
			<div className="navbar--container-threads ">
				<ThreadsList
					threads={threads}
					currentThread={currentThread}
					editingId={editingId}
					titleValue={titleValue}
					handleSelectThread={handleSelectThread}
					handleTitleEdit={handleTitleEdit}
					handleEditThreadClick={handleEditThreadClick}
					handleDeleteThreadClick={handleDeleteThreadClick}
					setTitleValue={setTitleValue}
				/>
			</div>
			<LanguageSwitcher switchLanguage={switchLanguage} />
		</div>
	);
};
