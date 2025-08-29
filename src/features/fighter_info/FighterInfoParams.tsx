// FighterInfoParams.tsx
import type { FC } from 'react';
import type { FighterRecord } from '@/types/Fighter';

interface FighterInfoParamsProps {
	info: FighterRecord;
}

const FighterInfoParams: FC<FighterInfoParamsProps> = ({ info }) => {
	return (
		<table className="mrgn w-100 cs-0 cp-0">
			<tbody>
				<tr>
					<td>Возраст:</td>
					<td className="al-right">
						{/*  todo - add condition for maxAge */}
						<span
							style={{ color: 'red', fontWeight: 'bolder' }}
							title="Боец планирует в скором времени завершить карьеру."
						>
							{info.Age}
						</span>
					</td>
				</tr>
				<tr>
					<td>Рост:</td>
					<td className="al-right">{info.Height} см</td>
				</tr>
				<tr>
					<td>
						Вес:
						<hr />
					</td>
					<td className="al-right">
						{info.Weight} кг
						<hr />
					</td>
				</tr>
				<tr>
					<td>Сила:</td>
					<td className="al-right">
						<span className="s">{info.Strength}</span>
					</td>
				</tr>
				<tr>
					<td>Ловкость:</td>
					<td className="al-right">
						<span className="d">{info.Dexterity}</span>
					</td>
				</tr>
				<tr>
					<td>Выносливость:</td>
					<td className="al-right">
						<span className="st">{info.Stamina}</span>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default FighterInfoParams;
