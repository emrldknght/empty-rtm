// hooks/useTransfer.ts
import { useEffect, useState } from 'react';
import { useTransferStore } from '@/features/transfer/transferStore';
import { useMainStore } from '@/store/mainStore';

export const useTransfer = () => {
	const { authToken } = useMainStore((s) => ({ authToken: s.authToken }));
	const { fetchTransferList } = useTransferStore();
	const [page, setPage] = useState(1);

	const fighters = useTransferStore((s) => s.fighters);
	const loading = useTransferStore((s) => s.loading);
	const error = useTransferStore((s) => s.error);
	const pagination = useTransferStore((s) => s.pagination);

	useEffect(() => {
		if (authToken) {
			fetchTransferList();
		}
	}, [authToken, fetchTransferList]);

	return {
		fighters,
		loading,
		error,
		pagination,
		currentPage: page,
		setCurrentPage: setPage,
	};
};
