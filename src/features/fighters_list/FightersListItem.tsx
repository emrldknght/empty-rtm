// FightersListItem.tsx

import Image from 'next/image';
import type React from 'react';
import { useMemo } from 'react';
import { API_PATH } from '@/api/const';
import { MakeInfo } from '@/features/eng_old/MakeInfo';
import { getEquippedWith } from '@/features/fighters_list/getEquippedWith';
import { FRAME_DIV_TARGET } from '@/sections';
import type { FighterRecord } from '@/types/Fighter';

interface FightersListItemProps {
	fighter: FighterRecord;
}

const FightersListItem = ({ fighter }: FightersListItemProps) => {
	// Compute image source
	const imSrc = `${API_PATH}/img/clubbanners/small/${fighter.Banner}`;

	// Compute equipped weapon info
	const equippedWith = useMemo(
		() => getEquippedWith(fighter.ThingsClasses, fighter.ThingsTypes),
		[fighter.ThingsClasses, fighter.ThingsTypes],
	);

	// Handle click to show fighter info
	const handleClickFighter = (e: React.MouseEvent) => {
		e.preventDefault();
		MakeInfo(fighter.ID, FRAME_DIV_TARGET.Left, 'finfo');
		return false;
	};

	// Handle drag start
	const handleDragStart = (e: React.DragEvent) => {
		console.log('handleDrag', e);
		e.dataTransfer.setData('text/plain', fighter.ID.toString());
	};

	return (
		<tr id={`tr_${fighter.ID}`} draggable={true} onDragStart={handleDragStart}>
			<td id={`td_${fighter.ID}`}>
				<span
					id={`f_${fighter.ID}_2`}
					className="dfighter ui-draggable"
					style={{ whiteSpace: 'nowrap' }}
				>
					<button
						type="button"
						className="href-button"
						onClick={handleClickFighter}
					>
						{/* Club Banner */}
						<span title={fighter.ClubName}>
							<Image src={imSrc} height="11" alt="club banner small" />
						</span>

						{/* Weapon Icon (if equipped) */}
						{equippedWith.ttl && (
							<span title={equippedWith.ttl}>
								<Image
									src={`${API_PATH}/img/wicons/${equippedWith.weapon}`}
									alt="weapon icon small"
								/>
							</span>
						)}

						{/* Fighter Name */}
						<span title={`Информация о бойце\n ${fighter.Name}`}>
							{fighter.Name}
						</span>
					</button>
				</span>

				{/* Optional: Items count or other metadata -- todo - check*/}
				{fighter.Items != null && <span>{JSON.stringify(fighter.Items)}</span>}
			</td>

			{/* Effectiveness */}
			<td className="al-right">
				<span
					className="effectiveness"
					title={`Приблизительная эффективность\n бойца ${fighter.Name}`}
				>
					~{fighter.Effectiveness.toFixed(2)}
				</span>
			</td>
		</tr>
	);
};

export default FightersListItem;
