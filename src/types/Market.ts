import type { ItemRecord } from '@/types/Item';

export interface MarketRecord {
	MarketItemID: number;
	SellCost: number;
	Time: number;
}

export interface MarketItem extends MarketRecord, ItemRecord {
	UserID: number;
	UserName: string;
	UserClub: string;
}
