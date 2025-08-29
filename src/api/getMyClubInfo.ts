import { API_PATH } from '@/api/const';

export async function getMyClubInfo(_id: number, token: string) {
	const url = `${API_PATH}/api/my_club?Feature=mobile`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
	// return apiRequest<IClubInfo>(ServerActions.GetClub, id);
}
