export interface BaseRecord {
	User: number;
	BaseId: number;
	Attraction: number;
	Ticket: number;
	Chair: number;
	Bench: number;
	Recliner: number;
	ColTribune: number;
	Tribune: number;
	Sector: number;
	Container: number;
	CurrentF: number;
}

export interface BaseTemplateRecord {
	ID: number;
	Name: string;
	Img: string;
	Fighters: number;
	Watchers: number;
	Square: number;
	AdvSquare: number;
	Cost: number;
	Rent: number;

	Attraction: number;

	MaxChair: number;
	MaxBench: number;
	MaxRecliner: number;
	MaxColTribune: number;
	MaxTribune: number;
	MaxSector: number;
	MaxContainer: number;

	ChairCost: number;
	BenchCost: number;
	ReclinerCost: number;
	ColTribuneCost: number;
	TribuneCost: number;
	SectorCost: number;
	ContainerCost: number;
}
