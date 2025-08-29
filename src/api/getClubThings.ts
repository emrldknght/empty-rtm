import { API_PATH } from '@/api/const';
import type { ItemRecord } from '@/types/Item';

interface GetClubThingsResponse {
	dressed: number;
	items: ItemRecord[];
	total: number;
	undressed: number;
}
export const getClubThings = async (
	token: string,
): Promise<GetClubThingsResponse> => {
	const url = `${API_PATH}/api/club_things`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
};
