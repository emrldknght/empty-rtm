// store/mainStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { auth } from '@/api/auth';
import { getCombatList } from '@/api/getCombatList';
import { getFighterInfo } from '@/api/getFighterInfo';
import { getFightersList } from '@/api/getFightersList';
import { getMyClubInfo } from '@/api/getMyClubInfo';
import { Screens } from '@/features/app_screens/Screens';
import { getClubInfo } from '@/features/club_info/getClubInfo';
import { getClubsList } from '@/features/clubs_list/getClubsList';
import { FRAME_DIV_TARGET, SECTION_KEY } from '@/sections';
import { useAuthStore } from '@/store/authStore';
import type { IAnswer, MyClub } from '@/types';
import type { ClubRecord } from '@/types/ClubRecord';
import type { FighterRecord } from '@/types/Fighter';
import type { IUserRecord } from '@/types/IUserRecord';
import type { FrameDivTarget, SectionKey } from '@/types/section';
import type { UserCombatRecord } from '@/types/UserCombatRecord';

// Define the store type
interface MainStore {
	// State
	authToken: string | null;
	user: IUserRecord | null;
	screens: Record<string, { folded: boolean }>;
	fightersList: FighterRecord[];
	clubsList: ClubRecord[];
	myClub: MyClub | null;
	sections: {
		Left: SectionKey;
		Center: SectionKey;
		Right: SectionKey;
	};
	currentSection: FrameDivTarget;
	selectedClubInfo: {
		info: ClubRecord;
		fighters: FighterRecord[];
	} | null;
	selectedFighterInfo: FighterRecord | null;
	combatList: UserCombatRecord[];

	// Derived state (getters)
	// isAuthenticated: boolean;

	// Actions
	authorize: (
		login: string,
		pass: string,
	) => Promise<{ error?: string } | void>;
	processAuth: (session: string, data: IAnswer) => void;
	logOut: () => void;
	setAuthToken: (token: string) => void;
	setUser: (user: IUserRecord) => void;
	toggleScreen: (screen: Screens) => void;
	// todo - fix usage and typings
	setSection: (
		target: FrameDivTarget | string,
		section: SectionKey | string,
	) => void;
	fetchFightersList: () => Promise<void>;
	fetchClubsList: (page: number) => Promise<void>;
	fetchMyClub: () => Promise<void>;
	fetchSelectedClubInfo: (playerId: string | null) => Promise<void>;
	fetchSelectedFighterInfo: (fighterId: string) => Promise<void>;
	fetchCombatList: () => Promise<void>;

	// from eng_old
	// refreshRubles: () => Promise<void>;
}

export const useMainStore = create<MainStore>()(
	persist(
		(set, get) => ({
			// Initial state
			authToken: null,
			user: null,
			screens: {
				[Screens.ClubInfo]: { folded: false },
			},
			fightersList: [],
			clubsList: [],
			myClub: null,
			sections: {
				Left: 'MyClub',
				Center: 'Base',
				Right: 'Chat', // const
			},
			currentSection: 'Left',
			selectedClubInfo: null,
			selectedFighterInfo: null,
			combatList: [],

			/*
      // Getter: isAuthenticated
      get isAuthenticated() {
        return !!get().authToken;
      },
       */

			// Actions
			authorize: async (login: string, pass: string) => {
				const j = await auth(login, pass);
				if (j.error) {
					return { error: j.error };
				}

				const { PHPSESSID, id, token } = j;
				if (PHPSESSID && id) {
					localStorage.setItem('session', PHPSESSID);
					localStorage.setItem('id', id.toString());
				}

				if (token) {
					set({ authToken: token });
				}

				// Simulate navigation (handle in component or router)
				console.log('main store -- Redirecting to /');
				// navigateTo({ path: '/' }); // → handle outside
			},

			processAuth: (session: string, data: IAnswer) => {
				if (!data.token) return;

				const id = Number.parseInt(data.id);
				localStorage.setItem('session', session);
				localStorage.setItem('id', id.toString());
				set({ authToken: data.token });
			},

			logOut: () => {
				const { clearCredentials } = useAuthStore();
				clearCredentials();

				localStorage.removeItem('session');
				localStorage.removeItem('id');
				set({
					authToken: null,
					user: null,
					myClub: null,
					selectedClubInfo: null,
					selectedFighterInfo: null,
				});

				console.log('Logged out', get().authToken);
				// navigateTo({ path: '/auth' }); → handle in UI
			},

			setAuthToken: (token: string) => {
				console.log('setAuthToken', token);
				set({ authToken: token });
				console.log('has token', token);
			},

			setUser: (user: IUserRecord) => {
				set({ user });
			},

			toggleScreen: (screen: Screens) => {
				set((state) => {
					const screens = { ...state.screens };
					if (!screens[screen]) {
						screens[screen] = { folded: true };
					}
					screens[screen].folded = !screens[screen].folded;
					return { screens };
				});
			},

			setSection: (
				target: FrameDivTarget | string,
				sectionKey: SectionKey | string,
			) => {
				// const t = target === FRAME_DIV_TARGET.Left ? 'Left' : 'Center';
				/*
        const newSections = { ...get().sections };
        newSections[target] = sectionKey;
        set({ sections: newSections });
        set({ currentSection: target });
         */

				set((state) => ({
					sections: {
						...state.sections,
						[target as FrameDivTarget]: sectionKey,
					},
					currentSection: target as FrameDivTarget,
				}));
			},

			fetchFightersList: async () => {
				const { user, authToken } = get();
				if (!user || !authToken) return;

				const r = await getFightersList(user.ID, authToken);
				set({ fightersList: r.list });
			},

			fetchClubsList: async (page: number) => {
				const { authToken } = get();
				if (!authToken) return;

				const res = await getClubsList(page, authToken);
				set({ clubsList: res.list });
			},

			fetchMyClub: async () => {
				const { user, authToken } = get();

				console.log('fetch my club', user, authToken);

				if (!user || !authToken) return;

				console.log('fetch club', authToken);
				const club = await getMyClubInfo(user.ID, authToken);
				set({ myClub: club });
			},

			fetchSelectedClubInfo: async (playerId: string | null) => {
				const { authToken } = get();
				if (!playerId || !authToken) {
					set({ selectedClubInfo: null });
					return;
				}

				const info = await getClubInfo(playerId, authToken);
				set({ selectedClubInfo: info });
			},

			fetchSelectedFighterInfo: async (fighterId: string) => {
				const { authToken } = get();
				if (!authToken) return;

				const info = await getFighterInfo(fighterId, authToken);
				set({ selectedFighterInfo: info });
			},

			fetchCombatList: async () => {
				const { authToken } = get();
				if (!authToken) return;

				const list = await getCombatList(authToken);
				set({ combatList: list });
			},

			// from eng_old
		}),
		{
			name: 'mainStore', // key in localStorage
			storage: createJSONStorage(() => localStorage), // use AsyncStorage for React Native
			partialize: (state) => ({
				// Only persist essential state
				authToken: state.authToken,
				user: state.user,
				screens: state.screens,
				sections: state.sections,
				currentSection: state.currentSection,
			}),
			onRehydrateStorage: (state) => {
				return (state, error) => {
					if (error) {
						console.error('Hydration error:', error);
					} else {
						console.log('Hydrated state:', state);
					}
				};
			},
		},
	),
);
