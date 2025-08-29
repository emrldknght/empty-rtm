// FighterInfoStats.tsx
import type { FC } from 'react';
import type { FighterRecord } from '@/types/Fighter';

interface FighterInfoStatsProps {
	fighter: FighterRecord;
}

const FighterInfoStats: FC<FighterInfoStatsProps> = ({ fighter }) => {
	return (
		<div>
			<b>Навыки:</b>
			<table
				className="fighter-info-stats mrgn cs-0 cp-0"
				style={{ width: '98%' }}
			>
				<tbody>
					<tr>
						<td className="stat-name">Одноручный меч:</td>
						<td className="stat-value">{fighter.Sword}</td>
						<td className="whitespace">&nbsp;</td>
						<td className="stat-name">Щит:</td>
						<td className="stat-value">{fighter.Shield}</td>
					</tr>
					<tr>
						<td className="stat-name">Полутораруч. меч:</td>
						<td className="stat-value">{fighter.Bastard}</td>
						<td className="whitespace">&nbsp;</td>
						<td className="stat-name">Дробящее:</td>
						<td className="stat-value">{fighter.MorningStar}</td>
					</tr>
					<tr>
						<td className="stat-name">Древковое:</td>
						<td className="stat-value">{fighter.PoleArm}</td>
						<td className="whitespace">&nbsp;</td>
						<td className="stat-name">Борьба:</td>
						<td className="stat-value">{fighter.Wrestling}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default FighterInfoStats;
