import { API_PATH } from '@/api/const';
import type { FighterRecord } from '@/types/Fighter';

interface MyClubReviewGetResponse {
	data: FighterRecord[];
}
export const myClubReviewGet = async (
	token: string,
): Promise<MyClubReviewGetResponse> => {
	const url = `${API_PATH}/api/my_club_review`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
};
