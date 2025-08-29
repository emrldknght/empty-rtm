import { API_PATH } from '@/api/const';

export const getFighterInfo = async (fighterId: string, token: string) => {
	// http://localhost:8080/api_fighter?Feature=mobile&ID=40
	const url = `${API_PATH}/api/fighter?Feature=mobile&ID=${fighterId}`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
};
