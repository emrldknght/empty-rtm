// RecruitsDisplayItem.tsx
import type React from 'react';
import { MakeInfo } from '@/features/eng_old/MakeInfo';
import { calcEff } from '@/features/fighters_list/calcEff';
import { FRAME_DIV_TARGET, SECTION_KEY } from '@/sections';
import type { FighterRecord } from '@/types/Fighter';

// Props interface
interface RecruitsDisplayItemProps {
	fighter: FighterRecord;
	onRecruit: (fighter: FighterRecord) => void;
}

const RecruitsDisplayItem: React.FC<RecruitsDisplayItemProps> = ({
	fighter,
	onRecruit,
}) => {
	const handleClickName = (e: React.MouseEvent) => {
		e.preventDefault();
		MakeInfo(fighter.ID, FRAME_DIV_TARGET.Left, SECTION_KEY.FighterInfo);
	};

	const handleClickAction = (e: React.MouseEvent) => {
		e.preventDefault();
		onRecruit(fighter);
	};

	const getEff = () => {
		const f = { ...fighter };
		f.Talent = 2;
		f.Luck = 2;
		return Math.floor(Number(calcEff(f)));
	};

	return (
		<tr>
			{/* Fighter Name */}
			<td>
				<button type="button" className="href-button" onClick={handleClickName}>
					<span title={`Информация о бойце ${fighter.Name}`}>
						{fighter.Name}
					</span>
				</button>
			</td>

			{/* Height / Weight / Age */}
			<td className="al-right">
				<span title="Рост/Вес/Возраст">
					{fighter.Height} / {fighter.Weight} /{' '}
					<span
						style={{ color: 'red', fontWeight: 'bolder' }}
						title="Боец планирует в скором времени завершить карьеру."
					>
						{fighter.Age}
					</span>
				</span>
			</td>

			{/* Strength */}
			<td className="al-right s">
				<span title="Сила">{fighter.Strength}</span>
			</td>

			{/* Dexterity */}
			<td className="al-right d">
				<span title="Ловкость">{fighter.Dexterity}</span>
			</td>

			{/* Stamina */}
			<td className="al-right st">
				<span title="Выносливость">{fighter.Stamina}</span>
			</td>

			{/* Effectiveness */}
			<td className="al-right">
				<span title="Приблизительная эффективность" className="effectiveness">
					~{getEff()} {/* :{fighter.Effectiveness} */}
				</span>
			</td>

			{/* Action: Recruit */}
			<td className="al-right">
				<span title="Действие">
					<button
						type="button"
						className="href-button"
						onClick={handleClickAction}
					>
						Пригласить ($10)
					</button>
				</span>
			</td>
		</tr>
	);
};

export default RecruitsDisplayItem;
