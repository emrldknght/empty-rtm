// src/features/transfer/TransferDisplay.tsx
import { useEffect } from 'react';
import { useTransferStore } from '@/features/transfer/transferStore';
import { useMainStore } from '@/store/mainStore';
import type { FighterRecord } from '@/types/Fighter';
import { TransferItem } from './TransferItem'; // Add this import

const TransferDisplay = () => {
	const { user } = useMainStore((state) => ({ user: state.user }));

	const {
		fighters,
		loading,
		error,
		page,
		pagination,
		fetchTransferList,
		setPage,
	} = useTransferStore();

	const currentPage = page;
	const totalPages = pagination?.totalPages || 1;

	// Fetch on mount and when page changes
	useEffect(() => {
		fetchTransferList();
	}, [fetchTransferList]);

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage !== currentPage) {
			setPage(newPage);
			fetchTransferList(); // triggers with updated [page](file://D:\emkni\dev\empty-rt\src\store\marketStore.ts#L35-L35)
		}
	};

	const isMyFighter = (f: FighterRecord) => f.Master === user?.ID;

	if (loading && fighters.length === 0) {
		return <div>Загрузка бойцов на трансфере...</div>;
	}

	if (error) {
		return (
			<div>
				<strong>Ошибка:</strong> {error}
				<br />
				<button type="button" onClick={fetchTransferList}>
					Повторить
				</button>
			</div>
		);
	}

	if (fighters.length === 0) {
		return <div>Нет бойцов на трансфере.</div>;
	}

	return (
		<div>
			<h2>Бойцы на трансфере</h2>
			<button
				type="button"
				onClick={fetchTransferList}
				style={{ marginBottom: '16px' }}
			>
				🔄 Обновить
			</button>

			{/* Pagination */}
			{totalPages > 1 && (
				<div style={{ marginBottom: '16px', textAlign: 'center' }}>
					Страница {currentPage} из {totalPages}
					<div style={{ marginTop: '8px' }}>
						{Array.from({ length: totalPages }, (_, i) => {
							const pageNum = i + 1;
							return (
								<button
									key={pageNum}
									type="button"
									onClick={() => handlePageChange(pageNum)}
									disabled={pageNum === currentPage}
									style={{
										margin: '0 4px',
										padding: '4px 8px',
										fontWeight: pageNum === currentPage ? 'bold' : 'normal',
										backgroundColor:
											pageNum === currentPage ? '#e0e0e0' : '#fff',
										border: '1px solid #ccc',
										cursor: 'pointer',
									}}
								>
									{pageNum}
								</button>
							);
						})}
					</div>
				</div>
			)}

			{/* Fighter List */}
			{fighters.map((f) => (
				<TransferItem
					key={f.ID}
					fighter={f}
					isMine={isMyFighter(f)}
					onAction={fetchTransferList}
				/>
			))}

			{/* Pagination (bottom) */}
			{totalPages > 1 && (
				<div style={{ marginTop: '16px', textAlign: 'center' }}>
					Страница {currentPage} из {totalPages}
				</div>
			)}
		</div>
	);
};

export default TransferDisplay;
