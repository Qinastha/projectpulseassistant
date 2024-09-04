import React, { useState } from "react";
import "./Conversation.scss";

interface Message {
	id: number;
	text: string;
	sender: "user" | "bot";
}

export const Conversation: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputValue, setInputValue] = useState("");

	const handleSend = () => {
		if (inputValue.trim() !== "") {
			const newMessage: Message = {
				id: messages.length + 1,
				text: inputValue,
				sender: "user",
			};

			setMessages([...messages, newMessage]);
			setInputValue("");
		}
	};

	return (
		<div className="chat-container ">
			<div className="messages-container">
				{messages.map(message => (
					<div key={message.id} className={`message ${message.sender}`}>
						{message.text}
					</div>
				))}
			</div>
			<div className="input-container">
				<input
					type="text"
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					placeholder="Type a question..."
				/>
				<button onClick={() => handleSend()}>Send</button>
			</div>
		</div>
	);
};
