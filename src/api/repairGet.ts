import { API_PATH } from '@/api/const';
import type { RepairItemRecord } from '@/features/repair/RepairItem';

interface RepairGetResponse {
	// items: ItemRecord[]; // todo - check api typings
	items: RepairItemRecord[];
	count: number;
	found: number;
}
export const repairGet = async (
	token: string,
	page: number,
): Promise<RepairGetResponse> => {
	const urlParams = new URLSearchParams();
	urlParams.append('Feature', 'mobile');
	if (page > 0) {
		urlParams.append('Page', page.toString());
	}

	const url = `${API_PATH}/api/repair?${urlParams.toString()}`;

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
};
