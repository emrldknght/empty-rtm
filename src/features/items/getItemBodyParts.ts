import type { BodyPartName, ItemRecord } from '@/types/Item';

export const BodyParts: Record<BodyPartName, string> = {
	righthand: 'mainhand',
	lefthand: 'offhand',
	helmet: 'голова',
	torso: 'корпус',
	shoulderpads: 'плечи',
	cuisses: 'бёдра',
	bracers: 'руки',
	glowes: 'кисти',
	jambs: 'голени',
	boots: 'стопы',
};

export const getItemBodyParts = (item: ItemRecord) => {
	if (item.Class !== 'armor') {
		return '';
	}
	if (!item.BodyPart) {
		return '';
	}
	const parts = item.BodyPart.split(',');
	return parts.map((e) => BodyParts[e as BodyPartName]).join(', ');
};
