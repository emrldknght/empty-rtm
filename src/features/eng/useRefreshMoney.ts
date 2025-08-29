// hooks/useRefreshMoney.ts
import { useCallback } from 'react';
import { shallow } from 'zustand/shallow';
import { useMainStore } from '@/store/mainStore';
import { useRefreshRubles } from './useRefreshRubles'; // ← Reuse it!

export const useRefreshMoney = () => {
	const { authToken, user, setUser } = useMainStore((state) => ({
		authToken: state.authToken,
		user: state.user,
		setUser: state.setUser,
	}));

	const refreshRubles = useRefreshRubles(); // ← Already optimized hook

	const refreshMoney = useCallback(async () => {
		if (!authToken || !user || !setUser) {
			console.warn('[useRefreshMoney] Missing required state');
			return false;
		}

		try {
			const response = await fetch('/a.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: 'refreshmoney=',
			});

			if (!response.ok) {
				console.error('[useRefreshMoney] HTTP error:', response.status);
				return false;
			}

			const resultText = await response.text();
			const newMoney = parseFloat(resultText.trim());

			if (isNaN(newMoney)) {
				console.warn('[useRefreshMoney] Invalid money value:', resultText);
				return false;
			}

			// ✅ Update Money in user
			const updatedUser = { ...user, Money: newMoney };
			setUser(updatedUser);

			// 🔁 Then refresh rubles (as original function did)
			await refreshRubles();

			return true;
		} catch (error) {
			console.error('[useRefreshMoney] Request failed:', error);
			return false;
		}
	}, [authToken, user, setUser, refreshRubles]);

	return refreshMoney;
};
