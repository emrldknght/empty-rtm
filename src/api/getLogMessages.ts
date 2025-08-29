import { API_PATH } from '@/api/const';

export const getLogMessages = async (token: string, lastMessageId: number) => {
	const urlParams = new URLSearchParams();
	urlParams.append('Feature', 'mobile');
	if (lastMessageId > 0) {
		urlParams.append('LastMessageID', lastMessageId.toString());
	}

	const url = `${API_PATH}/api/messages?${urlParams.toString()}`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
};
