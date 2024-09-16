import React, { useEffect, useRef, useState } from "react";
import "./Thread.scss";
import { IThread, IThreadMessage } from "../../core";
import axios from "axios";

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
	const [displayedMessage, setDisplayedMessage] = useState<string>("");

	const handleSendMessage = async () => {
		if (currentThread) {
			const tempId = "tempId-" + Date.now();
			const newMessages: IThreadMessage[] = [
				...currentThread.messages,
				{
					text: inputValue,
					_id: tempId,
					sender: "user",
					timestamp: new Date(),
				},
				{
					text: "",
					_id: "temp-assistant",
					sender: "assistant",
					timestamp: new Date(),
				},
			];
			setCurrentThread({ ...currentThread, messages: newMessages });
			setInputValue("");
			setDisplayedMessage("");

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
					if (updatedThread) {
						const lastMessage =
							updatedThread.messages[updatedThread.messages.length - 1];

						if (lastMessage?.sender === "assistant") {
							let messageText = lastMessage.text;
							let index = -1;

							const typingInterval = setInterval(() => {
								setDisplayedMessage(
									(prev: string) => prev + messageText[index],
								);
								index++;
								if (index === messageText.length - 1) {
									clearInterval(typingInterval);
									setCurrentThread(updatedThread);
								}
							}, 50);
						} else {
							setCurrentThread(updatedThread);
						}
					} else {
						console.error("Failed to update thread.");
					}
				} else {
					console.error("Failed to fetch thread.");
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
	}, [currentThread]);

	return (
		<div className="chat-container">
			{currentThread ? (
				<>
					<div className="messages-container">
						{currentThread.messages
							.slice(0, -1)
							.map((message: IThreadMessage) => (
								<div key={message._id} className={`message ${message.sender}`}>
									{message.text}
								</div>
							))}

						{currentThread.messages.length > 0 && (
							<div
								key={
									currentThread.messages[currentThread.messages.length - 1]._id
								}
								className={`message assistant`}>
								{displayedMessage ||
									currentThread.messages[currentThread.messages.length - 1]
										.text}
							</div>
						)}

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
							disabled={inputValue === ""}>
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
