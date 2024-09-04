import React, { useState } from "react";
import "./Navbar.scss";
import { IConversation } from "../../core";

export const Navbar: React.FC = () => {
	const [conversations, setConversations] = useState<IConversation[]>([]);

	const handleConversationCreate = () => {
		const newConversation: IConversation = {
			_id: conversations.length + 1,
			name: "New conversation",
			prompts: [],
			responses: [],
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		setConversations([...conversations, newConversation]);
	};

	return (
		<div className="navbar--container ">
			<div className="navbar--container-title glassmorphism">
				<h3>Conversations list:</h3>
				<button onClick={handleConversationCreate}>Create</button>
			</div>
			<div className="navbar--container-conversations glassmorphism">
				{conversations.map(conversation => (
					<div key={conversation._id} className="conversation">
						<h6>{conversation.name}</h6>
						<p>{conversation.updatedAt}</p>
					</div>
				))}
			</div>
		</div>
	);
};
