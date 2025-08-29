// ClubsListItem.tsx
import React from 'react';
import ClubAward from '@/features/club_info/ClubAward';
import ClubPremium from '@/features/club_info/ClubPremium';
import ClubShield from '@/features/club_info/ClubShield';
import type { ClubRecord } from '@/types/ClubRecord';

// Props interface
type ClubsListItemProps = {
	idx: number;
	club: ClubRecord;
	onInfo?: (id: ClubRecord['ID']) => void;
};

// Component
const ClubsListItem: React.FC<ClubsListItemProps> = ({ idx, club, onInfo }) => {
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		if (!onInfo) {
			return;
		}
		onInfo(club.ID);
	};

	return (
		<section>
			{/* Header Row */}
			<table className="w-100 cs-0">
				<tbody>
					<tr className="tableheader">
						<td colSpan={2} className="tableheader">
							<button
								type="button"
								className="href-button"
								onClick={handleClick}
							>
								&nbsp;
								<b>
									{idx}I. {club.Club}
								</b>
								{club.Premium && <ClubPremium />}
							</button>
						</td>
						<td className="online al-right">{club.Online}&nbsp;</td>
					</tr>
				</tbody>
			</table>

			{/* Details Table */}
			<table className="w-100">
				<tbody>
					<tr>
						{/* Club Shield (Left) */}
						<td className="clubcell" style={{ width: '120px' }}>
							<ClubShield club={club} />
						</td>

						{/* Club Info (Center) */}
						<td valign="top" className="clubcell">
							Глава: <b>{club.Name}</b>
							<br />
							Рейтинг: <span className="rating">{club.Rating}</span>
							<br />
							Бойцов: {club.FightersNum}
							<br />
							Побед: {club.Win}
							<br />
							Поражений: {club.Lose}
							<br />В игре: 1864 д. 3 ч. 31 м.
							<br />
							(c 20.03.20)
						</td>

						{/* Awards (Right) */}
						<td valign="top" className="clubcell" style={{ width: '230px' }}>
							Награды:
							<br />
							{club.Awards.map((award) => (
								<React.Fragment key={award.ID}>
									<ClubAward award={award} />
								</React.Fragment>
							))}
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	);
};

export default ClubsListItem;
