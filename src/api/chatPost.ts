import { API_PATH } from '@/api/const';
import type { ChatRecord } from '@/types/Chat';

interface CharGetResponse {
	messages: ChatRecord[];
}
export const chatPost = async (
	token: string,
	data: {
		name?: string;
		text: string;
	},
): Promise<CharGetResponse> => {
	console.log('chatPost', data);

	const url = `${API_PATH}/api/chat`;
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: token,
		},
		body: JSON.stringify({
			time: 1,
			name: data.name || 'Test Name 0106',
			text: data.text,
			club: '2',
			/*
      Time: 1,
      Name: "Test Name 0106cl",
      Text: data.text,
      Club: 2
       */
		}),
	});
	return await response.json();
};
