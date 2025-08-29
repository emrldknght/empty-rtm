export enum WEvents {
	Authorize = 'authorize',
	RefreshMoney = 'refresh-money',
	UploadOptions = 'upload-options',
	// dialog
	DialogShow = 'dialog-show',
	DialogHide = 'dialog-hide',
	DialogSetHeader = 'dialog-set-header',
	DialogSetText = 'dialog-set-text',
	DialogSetCallback = 'dialog-set-callback',
	DialogSetMode = 'dialog-set-mode',
	DialogSetPre = 'dialog-set-pre',

	ShowCombatWindow = 'combat-window-show',

	RequestFailed = 'request-failed',

	AddItem = 'add-item',
	RemoveItem = 'remove-item',

	AddItemDebug = 'add-item-debug',
	RemoveItemDebug = 'remove-item-debug',

	FighterListLoaded = 'fighter-list-loaded',
	EquipItem = 'equip-item',
	UseItem = 'use-item',
	// ChangeTraining = 'change-training',
	TapEquippedItemOnFighterScreen = 'tap-eq-item-on-fighter-screen',
	ItemTypeFilterUpdate = 'item-type-filter:update:',

	SelectFighterInList = 'select-fighter-in-list',
	SelectRecruit = 'select-recruit',
	InviteFighter = 'invite-fighter',
	HireFighter = 'hire-fighter',
	PlaceToTransfer = 'place-to-transfer',

	SelectNotOwnedFighter = 'select-not-owned-fighter',

	// toggle
	EmptyScreenToggle = 'empty-screen-toggle',
	TemplateScreenToggle = 'template-screen-toggle',

	ClubInfoScreenToggle = 'club-info-screen-toggle',
	ClubListScreenToggle = 'club-list-screen-toggle',
	TrainingBaseScreenToggle = 'training-base-screen-toggle',
	FighterListToggle = 'fighter-list-toggle',
	FighterInfoToggle = 'fighter-info-toggle',
	InventoryScreenToggle = 'inventory-screen-toggle',

	MarketScreenToggle = 'market-screen-toggle',
	MarketScreenUpdate = 'market-screen-update',

	ShopTabsScreenToggle = 'shop-tabs-screen-toggle',
	ShopScreenToggle = 'shop-screen-toggle',

	RepairScreenToggle = 'repair-screen-toggle',
	CombatListScreenToggle = 'combat-list-screen-toggle',
	CombatFriendlyScreenToggle = 'combat-friendly-screen-toggle',
	ChampionshipScreenToggle = 'championship-screen-toggle',
	RecruitScreenToggle = 'recruit-screen-toggle',
	TransferScreenToggle = 'transfer-screen-toggle',
	MessagesScreenToggle = 'messages-screen-toggle',
	ChatScreenToggle = 'chat-screen-toggle',
	PremiumShopScreenToggle = 'premium-shop-screen-toggle',
	FightersSummaryScreenToggle = 'fighters-summary-screen-toggle',
	TeamsScreenToggle = 'teams-screen-toggle',
	//
	AddFighterToTeamShow = 'add-fighter-to-team-show',
	AddFighterToTeamHide = 'add-fighter-to-team-hide',

	AddFighterToBattleShow = 'add-fighter-to-battle-show',
	AddFighterToBattleHide = 'add-fighter-to-battle-hide',

	MarkFighterForTeam = 'mark-fighter-for-team',
	UnmarkFighterForTeam = 'unmark-fighter-for-team',

	MarkFighterForBattle = 'mark-fighter-for-battle',
	MarkFighterForBattleSuccess = 'mark-fighter-for-battle-success',
	UnmarkFighterForBattle = 'unmark-fighter-for-battle',
	FriendlyCombatRequestFighterRemoved = 'friendly-combat-request-fighter-removed',
	FriendlyCombatRequestAppCreated = 'friendly-combat-request-app-created',
	FriendlyCombatRequestTeamCleared = 'friendly-combat-request-team-cleared',
}

type EventCallback = (...args: unknown[]) => void;

export type WEventKey = keyof typeof WEvents;

interface IEventBus {
	events: Record<string, EventCallback>;
	on(event: WEvents, callback: EventCallback): void;
	emit(event: WEvents, args?: unknown): void;
}

export const EventBus: IEventBus = {
	events: {},
	emit(event: string, ...args) {
		const cb = this.events[event];

		if (cb && typeof cb === 'function') {
			cb(...args);
		}

		// window.dispatchEvent(new CustomEvent(event, { detail: args }));
	},
	on(event, callback) {
		this.events[event] = callback;
		// window.addEventListener(event, (e) => callback(e.detail));
	},
};
