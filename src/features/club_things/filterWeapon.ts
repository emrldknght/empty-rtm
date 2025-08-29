import type { ItemRecord, WeaponTypes } from '@/types/Item';

export function filterWeapon(
	filter: boolean,
	item: ItemRecord,
	typeFilter: WeaponTypes,
): boolean {
	let _filter = filter;
	if (typeFilter) {
		_filter = item.type === typeFilter;
	}
	return _filter;
}
