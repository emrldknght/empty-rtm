import { API_PATH } from '@/api/const';

export const getClubInfo = async (playerId: string, token: string) => {
	const url = `${API_PATH}/api/club/${playerId}`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	});

	return await response.json();
};
