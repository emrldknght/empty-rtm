import { API_PATH } from '@/api/const';
import type { DonationRecord } from '@/types/DonationRecord';

interface DonateGetResponse {
	items: DonationRecord[];
}
export const donateGet = async (token: string): Promise<DonateGetResponse> => {
	const url = `${API_PATH}/api/donate`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
};
