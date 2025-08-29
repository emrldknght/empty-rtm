import { API_PATH } from '@/api/const';
import type { ChatRecord } from '@/types/Chat';

interface CharGetResponse {
	messages: ChatRecord[];
}
export const chatGet = async (
	token: string,
	messageID: number,
): Promise<CharGetResponse> => {
	const urlParams = new URLSearchParams();
	urlParams.append('Feature', 'mobile');
	if (messageID > 0) {
		urlParams.append('MessageID', messageID.toString());
	}

	const url = `${API_PATH}/api/chat?${urlParams.toString()}`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
};
