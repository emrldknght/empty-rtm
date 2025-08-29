export interface CombatRecord {
	ID: number;
	CId: number;
	Time: number;
	Fighter: string;
	Enemy: string;
	FighterBanner: string;
	EnemyBanner: string;
	Text: string;
	Deferred: string;
	Team0: string;
	Team1: string;
	Score0: number;
	Score1: number;

	Status?: string;
	Date?: string;
}
