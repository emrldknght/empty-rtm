import { API_PATH } from '@/api/const';
import type { BaseRecord, BaseTemplateRecord } from '@/types/Base';

export const getMyBase = async (
	token: string,
): Promise<{
	list: BaseTemplateRecord[];
	currentId: number;
	currentBase: BaseRecord;
	watchers: number;
}> => {
	const url = `${API_PATH}/api/my_base`;

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});

	return await response.json();
};
