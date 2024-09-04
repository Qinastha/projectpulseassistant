export interface IConversation {
	_id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
	prompts: string[];
	responses: string[];
}
