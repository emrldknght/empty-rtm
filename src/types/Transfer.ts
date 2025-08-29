// types/TransferFighter.ts
export interface TransferFighter {
	// todo - remove
	id: string;
	name: string;
	master: string; // user ID of owner
	club: string;
	img: string;
	trauma: string;
	trauma_duration: string;
	busy: number;
	age: number;
	generate_time: number;
	oldage: number;
	strength: number;
	dextirity: number;
	stamina: number;
	sword: number;
	shield: number;
	bastard: number;
	morningstar: number;
	polyarm: number;
	wrestling: number;
	transfer: number; // price in $
	height: number;
	weight: number;
	flaver: string;
}
