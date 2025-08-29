// FighterRow.tsx
import type React from 'react';
import { MakeInfo } from '@/features/eng_old/MakeInfo';
import { FRAME_DIV_TARGET, SECTION_KEY } from '@/sections';
import type { FighterRecord } from '@/types/Fighter';

type Props = {
	fighter: FighterRecord;
};

const ClubSummaryItem: React.FC<Props> = ({ fighter }) => {
	const handleClickName = (e: React.MouseEvent) => {
		e.preventDefault();
		MakeInfo(fighter.ID, FRAME_DIV_TARGET.Left, SECTION_KEY.FighterInfo);
	};

	return (
		<tr>
			{/* Name (Clickable) */}
			<td>
				<span title="Информация о бойце">
					<button
						type="button"
						className="href-button"
						onClick={handleClickName}
					>
						{fighter.Name}
					</button>
				</span>
			</td>

			{/* Height / Weight / Age */}
			<td>
				<span title="Рост/Вес/Возраст">
					{fighter.Height} / {fighter.Weight} / {fighter.Age}
				</span>
			</td>

			{/* Attributes */}
			<td>
				<span title="Сила" className="s">
					{fighter.Strength}
				</span>
			</td>
			<td>
				<span title="Ловкость" className="d">
					{fighter.Dexterity}
				</span>
			</td>
			<td>
				<span title="Выносливость" className="st">
					{fighter.Stamina}
				</span>
			</td>

			{/* Weapon Skills */}
			<td>
				<span title="Навык владения мечом">{fighter.Sword}</span>
			</td>
			<td>
				<span title="Навык владения щитом">{fighter.Shield}</span>
			</td>
			<td>
				<span title="Навык владения полутораручным мечом">
					{fighter.Bastard}
				</span>
			</td>
			<td>
				<span title="Навык владения дробящим оружием">
					{fighter.MorningStar}
				</span>
			</td>
			<td>
				<span title="Навык владения древковым оружием">{fighter.PoleArm}</span>
			</td>
			<td>
				<span title="Навык владения борьбой">{fighter.Wrestling}</span>
			</td>

			{/* Win/Loss */}
			<td>
				<span title="Количество побед">{fighter.Win}</span>
			</td>
			<td>
				<span title="Количество поражений">{fighter.Lose}</span>
			</td>

			{/* Effectiveness */}
			<td>
				<span
					title="Приблизительная эффективность бойца"
					className="effectiveness"
				>
					{fighter.Effectiveness}
				</span>
			</td>
		</tr>
	);
};

export default ClubSummaryItem;
