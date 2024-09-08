import axios from "axios";
import { IThread } from "../../core";

export const handleNewThread = async (token: string) => {
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
		return response?.data?.value as IThread;
	} catch (err: any) {
		console.error(err);
		throw err;
	}
};

export const handleEditThread = async (
	threadId: string,
	titleValue: string,
	token: string,
) => {
	try {
		const response = await axios.put(
			`http://localhost:4000/api/assistant/update/${threadId}`,
			{ title: titleValue },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
			},
		);
		return response?.data?.value as IThread;
	} catch (err: any) {
		console.error(err);
		throw err;
	}
};

export const handleDeleteThread = async (threadId: string, token: string) => {
	try {
		await axios.delete(
			`http://localhost:4000/api/assistant/delete/${threadId}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
			},
		);
	} catch (err: any) {
		console.error(err);
		throw err;
	}
};
