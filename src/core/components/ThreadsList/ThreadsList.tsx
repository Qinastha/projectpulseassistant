import React from "react";
import { IThread } from "../../interfaces";
import "./ThreadsList.scss";
import { trimText, useViewport } from "@Qinastha/pulse_library";
import { useTranslation } from "react-i18next";

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
	const { t } = useTranslation();
	const { viewportWidth } = useViewport();

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
									<h6>
										{trimText({
											title: thread.title,
											viewportWidth,
											charWidthVW: viewportWidth > 1080 ? 12 : 20,
										})}
									</h6>
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
					<p>{t("threadsList.noThreads")}</p>
				</div>
			)}
		</div>
	);
};
