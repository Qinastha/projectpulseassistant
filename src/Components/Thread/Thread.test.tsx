import { Thread } from "./Thread";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { IThread } from "../../core";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

let scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

describe("Thread component", () => {
	const mockedSetCurrentThread = jest.fn();
	const mockedToken = "test-token";
	const mockThread: IThread = {
		_id: "test-id",
		title: "Test Thread",
		messages: [
			{
				_id: "test-message-id",
				sender: "user",
				text: "Hello, how are you?",
				timestamp: new Date(),
			},
		],
	};
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("appropriate work without current thread", () => {
		render(
			<Thread
				currentThread={null}
				token={mockedToken}
				setCurrentThread={mockedSetCurrentThread}
			/>,
		);
		expect(screen.getByText(/No thread selected/i)).toBeTruthy();
	});

	test("should send message to the current thread", async () => {
		jest.fn().mockResolvedValueOnce({
			data: {
				value: {
					...mockThread,
					messages: [
						...mockThread.messages,
						{
							_id: "message3",
							text: "Test Message",
							sender: "user",
							timestamp: new Date(),
							isNew: false,
						},
					],
				},
			},
		});
		render(
			<Thread
				currentThread={mockThread}
				token={mockedToken}
				setCurrentThread={mockedSetCurrentThread}
			/>,
		);
		const input: HTMLInputElement = screen.getByRole("textbox");
		const sendButton: HTMLButtonElement = screen.getByRole("button", {
			name: /Send/i,
		});
		fireEvent.change(input, { target: { value: "Test Message" } });
		fireEvent.click(sendButton);

		expect(mockedAxios.post).toHaveBeenCalledTimes(1);
		expect(mockedAxios.post).toHaveBeenCalledWith(
			"http://localhost:4000/api/assistant/test-id/new",
			{ text: "Test Message" },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + mockedToken,
				},
			},
		);
		expect(input.value).toBe("");
	});
});
