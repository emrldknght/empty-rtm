import { API_PATH } from '@/api/const';
import type { CombatRecord } from '@/types/CombatRecord';
import type { UserCombatRecord } from '@/types/UserCombatRecord';

interface GetCombatResponse {
	data: UserCombatRecord;
	log: CombatRecord[];
}
export const getCombat = async (
	token: string,
	id: number,
	last: number,
): Promise<GetCombatResponse> => {
	// return GET_COMBAT_MOCK

	const urlParams = new URLSearchParams();
	urlParams.append('Feature', 'mobile');
	if (id > 0) {
		urlParams.append('CombatID', id.toString());
	}
	if (last > 0) {
		urlParams.append('Last', last.toString());
	}

	const url = `${API_PATH}/api/combat?${urlParams.toString()}`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
};
