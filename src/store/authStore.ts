import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const SAVE_CR = 'wmfm-login-cr';

interface AuthStore {
	login: string;
	password: string;
	save: boolean;
	error: string;
	setLogin: (login: string) => void;
	setPassword: (password: string) => void;
	setSave: (save: boolean) => void;
	setError: (error: string) => void;
	clearCredentials: () => void;
}

export const useAuthStore = create<AuthStore>()(
	persist(
		(set, get) => ({
			// Initial state // todo - delete default values
			login: 'yoba',
			password: 'yoba',
			save: false,
			error: '',

			// Actions
			setLogin: (login: string) => {
				set({ login });
			},

			setPassword: (password: string) => {
				set({ password });
			},

			setSave: (save: boolean) => {
				set({ save });
			},

			setError: (error: string) => {
				set({ error });
			},

			clearCredentials: () => {
				localStorage.removeItem(SAVE_CR);
				set({ login: '', password: '', save: false });
			},
		}),
		{
			name: SAVE_CR, // Name of the item in localStorage
			storage: createJSONStorage(() => localStorage), // Use localStorage (for web) or AsyncStorage (for React Native)
			// Optional: include only specific fields to persist
			partialize: (state) => ({
				login: state.login,
				password: state.password,
				save: state.save,
			}),
		},
	),
);
