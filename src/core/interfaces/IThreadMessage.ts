export interface IThreadMessage {
	_id: string;
	text: string;
	sender: "user" | "assistant";
	timestamp: Date;
	isNew: boolean;
}
