// hooks/useRefreshRubles.ts
import { useCallback } from 'react';
import { useMainStore } from '@/store/mainStore';

/**
 * Custom hook to refresh the user's Rubles balance
 * Makes a POST request to a.php with 'refreshrubles='
 * Parses plain text response and updates user.Roubles
 */
export const useRefreshRubles = () => {
	/*
  const authToken = useMainStore((state) => state.authToken);
  const user = useMainStore((state) => state.user);
  const setUser = useMainStore((state) => state.setUser);
   */
	const { authToken, user, setUser } = useMainStore((state) => ({
		authToken: state.authToken,
		user: state.user,
		setUser: state.setUser,
	}));

	const refreshRubles = useCallback(async () => {
		if (!authToken || !user) {
			console.warn('[useRefreshRubles] Missing authToken or user');
			return false;
		}

		try {
			const response = await fetch('/a.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: 'refreshrubles=',
			});

			if (!response.ok) {
				console.error('[useRefreshRubles] HTTP error:', response.status);
				return false;
			}

			const resultText = await response.text();
			const newRoubles = parseFloat(resultText.trim());

			if (isNaN(newRoubles)) {
				console.warn(
					'[useRefreshRubles] Invalid rubles value received:',
					resultText,
				);
				return false;
			}

			// ✅ Update only the Rubles field in user
			const updatedUser = { ...user, Roubles: newRoubles };
			setUser(updatedUser);

			console.log('[useRefreshRubles] Success:', newRoubles);
			return true; // Indicate success
		} catch (error) {
			console.error('[useRefreshRubles] Request failed:', error);
			return false;
		}
	}, [authToken, user, setUser]);

	return refreshRubles;
};
