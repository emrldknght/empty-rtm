import type { BodyPart, ItemRecord } from '@/types/Item';

export function filterArmor(
	filter: boolean,
	item: ItemRecord,
	partFilter: BodyPart,
): boolean {
	let _filter = filter;
	if (partFilter) {
		// todo - check api typings
		const bodyPart = item.bodypart || item.BodyPart || '';
		const parts = bodyPart.split(',');
		_filter = filter && parts.some((e: string) => e === partFilter);
	}
	return _filter;
}
