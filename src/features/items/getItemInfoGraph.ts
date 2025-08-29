// todo - move to api

import type { ItemRecord } from '@/types/Item';

const INFO_GRAPH_PARTS: Partial<Record<ItemRecord['BodyPart'], string>> = {
	helmet: '1',
	torso: '2',
	shoulderpads: '3',
	bracers: '4',
	glowes: '5',
	cuisses: '6',
	jambs: '7',
	boots: '8',
};

const sortAsc = (a: number, b: number) => a - b;
export const getItemInfoGraph = (parts: ItemRecord['BodyPart']) => {
	const tp = parts.split(',');

	console.log('parts', tp);

	return tp
		.map((e) => INFO_GRAPH_PARTS[e as keyof typeof INFO_GRAPH_PARTS])
		.sort(sortAsc)
		.join('');
};
