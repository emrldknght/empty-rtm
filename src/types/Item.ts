export type BodyPartName =
	| 'helmet'
	| 'torso'
	| 'shoulderpads'
	| 'bracers'
	| 'righthand'
	| 'lefthand'
	| 'glowes'
	| 'cuisses'
	| 'jambs'
	| 'boots';

export type ItemClass = 'armor' | 'weapon' | 'shield' | 'donate';

export type ItemType =
	// weapon
	| 'bastard'
	| 'sword'
	| 'morningstar'
	| 'polyarm'
	// armor
	| 'boots'
	| 'bracers'
	| 'cuisses'
	| 'glowes'
	| 'jambs'
	| 'shoulderpads'
	| 'torso'

	// shield
	| 'large'
	| 'medium'
	| 'buckler';
// | 'helmets'
// | 'gauntlets'

type TwoParts = `${BodyPartName},${BodyPartName}`;
type ThreeParts = `${BodyPartName},${BodyPartName},${BodyPartName}`;

export interface ItemRecord {
	ID: number;
	Name: string;
	FlaverText: string;
	Image: string;
	Class: ItemClass;
	Type: ItemType;
	DamageType: string;
	Hands: string;
	BodyPart: BodyPartName | TwoParts | ThreeParts;
	Defence: number;
	Damage: number;
	Speed: number;
	Weight: number;
	Length: number;
	Durability: number;
	MaxDurability: number;
	Cost: number;
	Trauma: number;
	Authentic: number;
	Beauty: number;
	Owner: number;
	Dressed: number;
	Forgery: number;
	ToSell: number;
	Action: string;
	ThingID: number;
}

export type IPlayerInfo = object;

// todo - check types
export enum ItemTypes {
	All = '',
	Weapon = 'weapon',
	Armor = 'armor',
	Shield = 'shield',
	Misc = 'donate',
}
export enum WeaponTypes {
	All = '',
	Sword = 'sword',
	Polearm = 'polyarm',
	Blunt = 'morningstar',
	Bastard = 'bastard',
}
export enum BodyPart {
	All = '',
	Helmet = 'helmet',
	Bracers = 'bracers',
	// RightHand = 'righthand',
	Glowes = 'glowes',
	Jambs = 'jambs',
	Torso = 'torso',
	ShoulderPads = 'shoulderpads',
	// LeftHand = 'lefthand',
	Cuisses = 'cuisses',
	Boots = 'boots',
}
