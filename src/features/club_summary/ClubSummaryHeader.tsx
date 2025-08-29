// ClubSummaryHeader.tsx
import type React from 'react';
import ClubSummaryHeaderTd from '@/features/club_summary/ClubSummaryHeaderTd';
import { SORT_KEYS, SORT_VALUES } from '@/features/club_summary/index';

type Props = {
	sort: string;
	sortOrderDesc: boolean;
	onSort: (param: string) => void;
};

const ClubSummaryHeader: React.FC<Props> = ({
	sort,
	sortOrderDesc,
	onSort,
}) => {
	const handleClickSort = (e: React.MouseEvent, param: string) => {
		e.preventDefault();
		onSort(param);
		// Optional: MakeSort(param, FRAME_DIV_TARGET.Center, SECTION_KEY.ClubReview);
	};

	return (
		<tr>
			{/* Fighter Name + Counter */}
			<td>
				<button
					type="button"
					className="href-button"
					onClick={(e) => handleClickSort(e, SORT_KEYS.ID)}
				>
					Боец:
				</button>
				<span className="fighter-list-counter">29/30</span>
			</td>

			{/* Height / Weight / Age (inline links) */}
			<td className="al-left">
				<button
					type="button"
					className="href-button"
					onClick={(e) => handleClickSort(e, SORT_KEYS.Height)}
				>
					Рст
				</button>
				/
				<button
					type="button"
					className="href-button"
					onClick={(e) => handleClickSort(e, SORT_KEYS.Weight)}
				>
					Вс
				</button>
				/
				<button
					type="button"
					className="href-button"
					onClick={(e) => handleClickSort(e, SORT_KEYS.Age)}
				>
					Взт:
				</button>
			</td>

			{/* Dynamic Stat Headers */}
			{SORT_VALUES.map((v) => (
				<ClubSummaryHeaderTd
					key={v.key}
					v={v}
					sort={sort}
					sortOrderDesc={sortOrderDesc}
					onSort={onSort}
				/>
			))}
		</tr>
	);
};

export default ClubSummaryHeader;
