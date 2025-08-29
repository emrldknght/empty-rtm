// utils/itemFilters.ts

import { BodyPart, type ItemRecord, WeaponTypes } from '@/types/Item';

export function filterArmor(item: ItemRecord, partFilter: BodyPart): boolean {
	if (partFilter === BodyPart.All) {
		return true;
	}
	// item.bodypart ||
	const bodyPart = item.BodyPart || '';
	const parts = bodyPart.split(',').map((p) => p.trim());
	return parts.includes(partFilter);
}

export function filterWeapon(
	item: ItemRecord,
	typeFilter: WeaponTypes,
): boolean {
	if (typeFilter === WeaponTypes.All) {
		return true;
	}
	// return item.type === typeFilter;
	return item.Type === typeFilter;
}
