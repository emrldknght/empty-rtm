// http://localhost:8080/api_clubs_list?Feature=mobile

import { API_PATH } from '@/api/const';
import type { ClubRecord } from '@/types/ClubRecord';

interface ClubsListResponse {
	list: ClubRecord[];
	found: number;
	count: number;
}
export const getClubsList = async (
	page: number,
	token: string,
): Promise<ClubsListResponse> => {
	// http://localhost:8080/api_fighters_list?Feature=mobile&ClubID=2

	const url = `${API_PATH}/api/clubs_list?Feature=mobile&Page=${page}`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
};
