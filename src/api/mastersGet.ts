import { API_PATH } from '@/api/const';
import type { MasterThingsRecord } from '@/types/Masters';

interface MastersGetResponse {
	items: MasterThingsRecord[] | null;
	count: number;
}
export const mastersGet = async (
	token: string,
	page: number,
	forgeFilter: string,
	typeFilter: string,
): Promise<MastersGetResponse> => {
	const urlParams = new URLSearchParams();
	urlParams.append('Feature', 'mobile');
	if (page > 0) {
		urlParams.append('Page', page.toString());
	}
	if (forgeFilter !== 'all') {
		urlParams.append('ForgeFilter', forgeFilter);
	}
	if (typeFilter !== 'all') {
		urlParams.append('TypeFilter', typeFilter);
	}
	const url = `${API_PATH}/api/masters?${urlParams.toString()}`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
};
