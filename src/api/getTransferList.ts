import { API_PATH } from '@/api/const';
import type { FighterRecord } from '@/types/Fighter';

interface GetTransferListResponse {
	count: number;
	list: FighterRecord[];
	page: number;
}
export const getTransferList = async (
	token: string,
	page: number,
): Promise<GetTransferListResponse> => {
	const urlParams = new URLSearchParams({
		page: page.toString(),
	});
	const url = `${API_PATH}/api/transfer?${urlParams.toString()}`;

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});

	return await response.json();
};
