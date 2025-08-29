import type { BodyPartName, ItemClass, ItemType } from '@/types/Item';

export interface MasterThingsRecord {
	ID: number;
	Name: string;
	FlaverText: string;
	Image: string;
	Class: ItemClass;
	Type: ItemType;
	DamageType: string;
	Hands: string;
	BodyPart: BodyPartName;
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
	Amount: number;
	Forgery: number;
	ThingID: number;
}
