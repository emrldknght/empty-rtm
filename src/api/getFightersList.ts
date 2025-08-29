import { API_PATH } from '@/api/const';
import type { FighterRecord } from '@/types/Fighter';

interface GetFightersListResponse {
	list: FighterRecord[];
	count: number;
}
export const getFightersList = async (
	clubId: number,
	token: string,
): Promise<GetFightersListResponse> => {
	// http://localhost:8080/api_fighters_list?Feature=mobile&ClubID=2

	const url = `${API_PATH}/api/fighters_list?Feature=mobile&ClubID=${clubId}`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
};
