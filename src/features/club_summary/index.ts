import type { FighterRecord } from '@/types/Fighter';

export const SORT_KEYS: Record<string, keyof FighterRecord> = {
	ID: 'ID',
	Height: 'Height',
	Weight: 'Weight',
	Age: 'Age',
	Strength: 'Strength',
	Dexterity: 'Dexterity',
	Stamina: 'Stamina',
	Sword: 'Sword',
	Shield: 'Shield',
	Bastard: 'Bastard',
	MorningStar: 'MorningStar',
	PoleArm: 'PoleArm',
	Wrestling: 'Wrestling',
	Win: 'Win',
	Lose: 'Lose',
	Effectiveness: 'Effectiveness',
};

export type SortValue = {
	text: string;
	key: keyof FighterRecord;
	className?: string;
};
export const SORT_VALUES: SortValue[] = [
	{ text: 'С', key: SORT_KEYS.Strength, className: 'csh-bold' },
	{ text: 'Л', key: SORT_KEYS.Dexterity, className: 'csh-bold' },
	{ text: 'В', key: SORT_KEYS.Stamina, className: 'csh-bold' },
	{ text: 'Меч', key: SORT_KEYS.Sword },
	{ text: 'Щит', key: SORT_KEYS.Shield },
	{ text: 'Плт', key: SORT_KEYS.Bastard },
	{ text: 'Дрб', key: SORT_KEYS.MorningStar },
	{ text: 'Дрв', key: SORT_KEYS.PoleArm },
	{ text: 'Брб', key: SORT_KEYS.Wrestling },
	{ text: 'W', key: SORT_KEYS.Win },
	{ text: 'L', key: SORT_KEYS.Lose },
	{ text: 'Эфф', key: SORT_KEYS.Effectiveness },
];
