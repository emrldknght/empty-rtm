export interface UserCombatRecord {
	ID: number;
	User: number;
	CombatId: number;
	EndTime: number;
	Result: 'win' | 'lose';
	Class: 'championship' | 'frendlycombats' | 'festival';
	Type: string;
	Team: number;
	Status: 'active' | 'finished';
	Date: string;
}
