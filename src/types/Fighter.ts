import type { ItemClass, ItemRecord, ItemType } from '@/types/Item';

export interface FighterStats {
	Strength: number;
	Dexterity: number;
	Stamina: number;
	Talent: number;
	Luck: number;
}

export interface FighterSkills {
	Sword: number;
	Shield: number;
	MorningStar: number;
	Bastard: number;
	PoleArm: number;
	Wrestling: number;
}

export interface FighterRecord extends FighterSkills, FighterStats {
	ID: number;
	Name: string;
	Club: string;
	Master: number;
	Time: number;

	// FighterStats
	// FighterSkills

	Fatigue: number;
	Trauma: string;
	TraumaDuration: number;
	Insurance: number;
	Weight: number;
	Height: number;
	Age: number;
	OldAge: number;
	Img: string;
	CombatStartTime: number;
	Training: string;
	GenerateTime: number;
	Win: number;
	Lose: number;
	Busy: number;
	Transfer: number;
	Awards: string;
	Tactics: string;

	// from get
	Fid: number;
	Banner: string;
	ClubName: string;
	Items: ItemRecord[];
	Parts: Record<string, ItemRecord>;
	// with items
	ThingsIds: string[];
	ThingsClasses: ItemClass[];
	ThingsTypes: ItemType[];

	Effectiveness: number;
	MaxWeight: number;
}
