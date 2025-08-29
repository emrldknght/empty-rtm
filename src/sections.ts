import type { SectionKey } from '@/types/section';

export const FRAME_DIV_TARGET = {
	Center: 'centerdiv',
	Left: 'leftdiv',
};

export const SECTION_KEY: Record<SectionKey, SectionKey> = {
	Home: 'Home',
	Settings: 'Settings',

	Clubs: 'Clubs',
	MyClub: 'MyClub',
	ClubReview: 'ClubReview',
	ClubMembers: 'ClubMembers',
	CombatList: 'CombatList',
	Base: 'Base',

	FriendlyCombats: 'FriendlyCombats',
	Championship: 'Championship',
	ClubThings: 'ClubThings',
	Market: 'Market',
	Masters: 'Masters',
	Repair: 'Repair',

	Donate: 'Donate',
	Transfer: 'Transfer',
	FreeFighters: 'FreeFighters',

	FighterInfo: 'FighterInfo',

	PlayerClubDetails: 'PlayerClubDetails',
	Chat: 'Chat',
};

/* export const SECTION_KEY: Record<SectionKey, string> = {
  Home: 'home',
  Settings: 'settings',

  Clubs: 'clubs',
  MyClub: 'myclub',
  ClubReview: 'clubreview',
  ClubMembers: 'clubmembers',
  CombatList: 'combatlist',
  Base: 'base',

  FriendlyCombats: 'frendlycombats',
  Championship: 'championship',
  ClubThings: 'clubthings',
  Market: 'market',
  Masters: 'masters',
  Repair: 'repair',

  Donate: 'donate',
  Transfer: 'transfer',
  FreeFighters: 'freefighters',

  FighterInfo: 'finfo',

  //
  PlayerClubDetails: 'player_club_details',
  Chat: 'chat',
};
 */
