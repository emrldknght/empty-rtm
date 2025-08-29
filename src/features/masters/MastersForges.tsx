// MastersForges.tsx
import type React from 'react';
import { MakeDiv } from '@/features/eng_old/MakeDiv';
import { MakeInfo } from '@/features/eng_old/MakeInfo';

// Props interface
interface MastersForgesProps {
	onForge: (forgeId: string) => void;
}

const MastersForges: React.FC<MastersForgesProps> = ({ onForge }) => {
	const handleClickForge = (forgeId: string) => {
		// Simulate legacy behavior
		MakeInfo(forgeId, 'centerdiv', 'masters', '1', '');
		// Notify parent
		onForge(forgeId);
	};

	const handleClickAll = () => {
		MakeDiv('centerdiv', 'masters');
		onForge('all');
	};

	return (
		<table className="w-100 cs-3 cp-3">
			<tbody>
				<tr />
				<tr>
					<td className="submenu">
						<button
							type="button"
							className="href-button"
							onClick={(e) => {
								e.preventDefault();
								handleClickForge('0');
							}}
						>
							<span data-id="menuforge0" className="">
								Кузня Святого Патрика
							</span>
						</button>
					</td>
					<td className="submenu">
						<button
							type="button"
							className="href-button"
							onClick={(e) => {
								e.preventDefault();
								handleClickForge('1');
							}}
						>
							<span data-id="menuforge1" className="">
								Мастерская «Средневековье»
							</span>
						</button>
					</td>
					<td className="submenu">
						<button
							type="button"
							className="href-button"
							onClick={(e) => {
								e.preventDefault();
								handleClickForge('2');
							}}
						>
							<span data-id="menuforge2" className="">
								Магазин «Реконструкция»
							</span>
						</button>
					</td>
				</tr>
				<tr>
					<td className="submenu">
						<button
							type="button"
							className="href-button"
							onClick={(e) => {
								e.preventDefault();
								handleClickForge('3');
							}}
						>
							<span data-id="menuforge3" className="">
								Мастер Петрович
							</span>
						</button>
					</td>
					<td className="submenu">
						<button
							type="button"
							className="href-button"
							onClick={(e) => {
								e.preventDefault();
								handleClickForge('4');
							}}
						>
							<span data-id="menuforge4" className="">
								ТО «Штамповка»
							</span>
						</button>
					</td>
					<td className="submenu" style={{ background: '#333' }}>
						<button
							type="button"
							className="href-button"
							onClick={(e) => {
								e.preventDefault();
								handleClickAll();
							}}
						>
							<span className="menuforge_all">Все производители</span>
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default MastersForges;
