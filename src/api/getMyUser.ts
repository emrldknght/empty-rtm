import { API_PATH } from '@/api/const';
import type { IUserRecord } from '@/types/IUserRecord';

export async function getMyUser(token: string): Promise<IUserRecord> {
	// http://localhost:8080/api_user
	const url = `${API_PATH}/api/user?Feature=mobile`;
	const response = await fetch(url, {
		method: 'GET',
		// credentials: 'include',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
	// return apiRequest<IClubInfo>(ServerActions.GetClub, id);
}
