import type { AwardRecord } from './AwardRecord';

export interface ClubRecord {
	ID: number;
	Club: string;
	Premium: number;
	Image: string;
	Rating: number;
	Win: number;
	Lose: number;
	Name: string;
	// *
	France: string;
	English: string;

	// computed
	Online: string;
	FightersNum: number;
	Awards: AwardRecord[];
}
