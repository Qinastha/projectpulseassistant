import React, { useEffect, useRef, useState } from "react";
import "./Thread.scss";
import axios from "axios";
import { IThread, IThreadMessage } from "../../core";

interface ThreadProps {
	currentThread: IThread | null;
	token: string;
	setCurrentThread: (thread: IThread) => void;
}

export const Thread: React.FC<ThreadProps> = ({
	currentThread,
	token,
	setCurrentThread,
}) => {
	const [inputValue, setInputValue] = useState("");
	const lastMessageRef = useRef<HTMLDivElement>(null);

	const handleSendMessage = async () => {
		if (currentThread) {
			setInputValue("");
			setCurrentThread({
				...currentThread,
				messages: [
					...currentThread.messages,
					{
						text: inputValue,
						_id: "messageId",
						sender: "user",
						timestamp: new Date(),
					},
				],
			});
			try {
				const response = await axios.post(
					`http://localhost:4000/api/assistant/${currentThread._id}/new`,
					{ text: inputValue },
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + token,
						},
					},
				);
				if (response?.data?.value) {
					const updatedThread = response.data.value as IThread;
					setCurrentThread(updatedThread);
				} else {
					console.error("Failed to send message.");
				}
			} catch (error) {
				console.error("Error sending message:", error);
			}
		} else {
			console.error("No current thread.");
		}
	};

	useEffect(() => {
		lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	return (
		<div className="chat-container ">
			{currentThread ? (
				<>
					<div className="messages-container">
						{currentThread.messages.map((message: IThreadMessage) => (
							<div key={message._id} className={`message ${message.sender}`}>
								{message.text}
							</div>
						))}
						<div ref={lastMessageRef} />
					</div>

					<div className="input-container">
						<input
							type="text"
							value={inputValue}
							onChange={e => setInputValue(e.target.value)}
							placeholder="Type a question..."
						/>
						<button
							onClick={() => handleSendMessage()}
							disabled={inputValue == ""}>
							Send
						</button>
					</div>
				</>
			) : (
				<div className="no-thread-selected">
					No thread selected. Please select a thread from the list or create a
					new one with button.
				</div>
			)}
		</div>
	);
};
