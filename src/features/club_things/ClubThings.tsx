// ClubThingsList.tsx
import type React from 'react';
import { useEffect } from 'react';
import './ClubThings.css';
import ClubThingsItem from '@/features/club_things/ClubThingsItem';
import { ThingsFilter } from '@/features/club_things/ThingsFilter';
import { useClubThingsStore } from '@/store/clubThingsStore';

const ClubThingsList: React.FC = () => {
	const { fetchClubThings, dressed, undressed, total, getItemsGrid } =
		useClubThingsStore();
	const grid = getItemsGrid();

	// Fetch on mount
	useEffect(() => {
		fetchClubThings();
	}, [fetchClubThings]);

	return (
		<table className="w-100 cs-0 cp-0">
			<tbody>
				{/* Header with Progress */}
				<tr className="tableheader">
					<td colSpan={8}>
						Склад:
						<span
							className="store_progress trainprogress"
							style={{
								background: `linear-gradient(to right, #006600 ${((dressed + undressed) / 304) * 100}%, #9f9f9f 0%)`,
								fontSize: '11px',
								width: '85px',
								height: '14px',
								cursor: 'pointer',
								display: 'inline-block',
								overflow: 'hidden',
								color: 'white',
								lineHeight: '12px',
								verticalAlign: 'top',
							}}
							title={`На бойцах: ${dressed}, Всего: ${undressed + dressed}, Вместимость: ${total}`}
						>
							&nbsp; (<span title="На бойцах">{dressed}</span>/
							<span title="Всего">{undressed + dressed}</span>/
							<span title="Вместимость">304</span>)
						</span>
					</td>
				</tr>

				{/* Filters */}
				<tr>
					<td colSpan={8}>
						<ThingsFilter />
					</td>
				</tr>

				{/* Spacer Row */}
				<tr>
					<td colSpan={8} className="formatclubthings">
						&nbsp;
					</td>

					{/* {Array.from({length: 8}).map((_, i) => (
						<td key={i} className="formatclubthings">
							&nbsp;
						</td>
					))} */}
				</tr>

				{/* Item Grid */}
				{grid.length > 0 ? (
					grid.map((row, idx) => (
						<tr key={`ct-row-${idx}-${row[idx].ID}`}>
							{row.map((item) => (
								<ClubThingsItem key={item.ID} item={item} />
							))}
						</tr>
					))
				) : (
					<tr>
						<td
							colSpan={8}
							style={{
								textAlign: 'center',
								fontStyle: 'italic',
								padding: '10px',
							}}
						>
							Нет предметов
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

export default ClubThingsList;
