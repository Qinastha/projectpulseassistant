import { IThreadMessage } from "./IThreadMessage";

export interface IThread {
	_id: string;
	title: string;
	messages: IThreadMessage[];
}
