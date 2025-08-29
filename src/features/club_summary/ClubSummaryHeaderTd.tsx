// ClubSummaryHeaderTd.tsx
import type React from 'react';

import './ClubSummaryHeaderTd.css';
import type { SortValue } from '@/features/club_summary/index'; // For scoped styles

type Props = {
	v: SortValue;
	sort: string;
	sortOrderDesc: boolean;
	onSort: (param: string) => void;
};

const ClubSummaryHeaderTd: React.FC<Props> = ({
	v,
	sort,
	sortOrderDesc,
	onSort,
}) => {
	const isActive = sort === v.key;
	const className = `al-right csh-cell ${isActive ? 'csh-active' : ''} ${
		isActive && sortOrderDesc ? 'csh-desc' : 'csh-asc'
	} ${v.className || ''}`;

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		onSort(v.key);
	};

	return (
		<td className={className}>
			<button type="button" className="href-button" onClick={handleClick}>
				{v.text}:
			</button>
		</td>
	);
};

export default ClubSummaryHeaderTd;
