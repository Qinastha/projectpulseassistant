import React from "react";
import { IThread } from "../../interfaces";
import "./ThreadsList.scss";
import { useViewport } from "@Qinastha/pulse_library";

interface ThreadsListProps {
	threads: IThread[];
	currentThread: IThread | null;
	editingId: string | null;
	titleValue: string;
	handleSelectThread: (threadId: string) => void;
	handleTitleEdit: (threadId: string) => void;
	handleEditThreadClick: (
		threadId: string,
		e: React.MouseEvent<HTMLButtonElement>,
	) => void;
	handleDeleteThreadClick: (
		threadId: string,
		e: React.MouseEvent<HTMLButtonElement>,
	) => void;
	setTitleValue: (value: string) => void;
}

export const ThreadsList: React.FC<ThreadsListProps> = ({
	threads,
	currentThread,
	editingId,
	titleValue,
	handleSelectThread,
	handleTitleEdit,
	handleEditThreadClick,
	handleDeleteThreadClick,
	setTitleValue,
}) => {
	const { viewportWidth } = useViewport();
	const getTrimmedTitle = (title: string) => {
		const charWidthVW = 10;
		const maxChars = Math.floor((viewportWidth * 0.18) / charWidthVW);
		return title.length > maxChars ? title.slice(0, maxChars) + "..." : title;
	};
	return (
		<div className="threadsList--container">
			{threads.length > 0 ? (
				<>
					{threads.map((thread: IThread) => (
						<div
							key={thread._id}
							className={`thread ${
								currentThread && currentThread._id === thread._id
									? "active"
									: ""
							}`}>
							{editingId !== thread._id ? (
								<div
									className="title--container"
									onClick={() => handleSelectThread(thread._id)}>
									<h6>{getTrimmedTitle(thread.title)}</h6>
								</div>
							) : (
								<div className="titleEdit--container">
									<input
										type="text"
										value={titleValue}
										className="titleEdit--input"
										onChange={e => setTitleValue(e.target.value)}
									/>
									<button
										className="titleEdit--btn"
										onClick={e => handleEditThreadClick(thread._id, e)}>
										&#10003;
									</button>
								</div>
							)}
							{editingId !== thread._id && (
								<div className="thread--actions-container">
									<button
										className="edit-btn"
										onClick={() => handleTitleEdit(thread._id)}
									/>
									<button
										className="delete-btn"
										onClick={e => handleDeleteThreadClick(thread._id, e)}
									/>
								</div>
							)}
						</div>
					))}
				</>
			) : (
				<div className="no-threads-container">
					<p>No threads found.</p>
				</div>
			)}
		</div>
	);
};
