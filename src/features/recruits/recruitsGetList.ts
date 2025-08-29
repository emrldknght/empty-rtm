import { API_PATH } from '@/api/const';
import type { FighterRecord } from '@/types/Fighter';

interface RecruitsGetListResponse {
	count: number;
	list: FighterRecord[];
	found: number;
}
export const recruitsGetList = async (
	token: string,
	page: number,
): Promise<RecruitsGetListResponse> => {
	const urlParams = new URLSearchParams();
	urlParams.append('Feature', 'mobile');
	if (page > 0) {
		urlParams.append('Page', page.toString());
	}

	const url = `${API_PATH}/api/recruits?${urlParams.toString()}`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
};
