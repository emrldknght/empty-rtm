// PagingDisplay.tsx
import type React from 'react';

type Props = {
	currentPage: number;
	totalItems: number;
	itemsOnPage: number;
	onPageChange: (page: number) => void;
};

const PagingDisplay: React.FC<Props> = ({
	currentPage,
	totalItems,
	itemsOnPage,
	onPageChange,
}) => {
	const totalPages = Math.ceil(totalItems / itemsOnPage);

	// If no pages, don't render anything
	if (totalPages <= 0) {
		return null;
	}

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	const handleClick = (e: React.MouseEvent, page: number) => {
		e.preventDefault();
		if (page === currentPage) {
			return;
		}
		onPageChange(page);
	};

	return (
		<div className="paging">
			{pages.map((p) => (
				<button
					type="button"
					key={p}
					className={`href-button ${p === currentPage ? 'highlight' : ''}`}
					onClick={(e) => handleClick(e, p)}
				>
					{p === currentPage ? <b>{p}</b> : p}
				</button>
			))}
		</div>
	);
};

export default PagingDisplay;
