import { API_PATH } from '@/api/const';
import type { ItemsPackRecord } from '@/types/ItemsPackRecord';

type ItemsPacksGetResponse = ItemsPackRecord;
export const itemsPacksGet = async (
	token: string,
): Promise<ItemsPacksGetResponse> => {
	const url = `${API_PATH}/api/items_packs`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
};
