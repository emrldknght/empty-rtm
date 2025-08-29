import { API_PATH } from '@/api/const';

export const getCombatList = async (token: string) => {
	const url = `${API_PATH}/api/combat_list`;

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});

	return await response.json();
};
