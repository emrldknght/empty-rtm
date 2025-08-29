import { API_PATH } from '@/api/const';
import { type BodyPart, ItemTypes, type WeaponTypes } from '@/types/Item';
import type { MarketItem } from '@/types/Market';

interface GetMarketResponse {
	items: MarketItem[] | null;
	count: number;
}

interface GetMarketFilters {
	itemTypeFilter?: ItemTypes;
	weaponTypeFilter?: WeaponTypes;
	armorPartFilter?: BodyPart;
}

export const getMarket = async (
	token: string,
	page: number,
	filters: GetMarketFilters,
): Promise<GetMarketResponse> => {
	const urlParams = new URLSearchParams();
	urlParams.append('Feature', 'mobile');
	if (page > 0) {
		urlParams.append('Page', page.toString());
	}
	const { itemTypeFilter, weaponTypeFilter, armorPartFilter } = filters;
	if (
		itemTypeFilter
		// && itemTypeFilter !== ItemTypes.All
	) {
		urlParams.append('ItemTypeFilter', itemTypeFilter.toString());
	}
	if (
		itemTypeFilter === ItemTypes.Weapon &&
		weaponTypeFilter
		// && weaponTypeFilter !== ItemTypes.All
	) {
		urlParams.append('WeaponTypeFilter', weaponTypeFilter.toString());
	}
	if (
		itemTypeFilter === ItemTypes.Armor &&
		armorPartFilter
		// && armorPartFilter !== ItemTypes.All
	) {
		urlParams.append('ArmorPartFilter', armorPartFilter.toString());
	}

	const url = `${API_PATH}/api/market?${urlParams.toString()}`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});
	return await response.json();
};
