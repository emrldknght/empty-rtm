// FighterInfo.tsx

import Image from 'next/image';
import type React from 'react';
import { useEffect, useState } from 'react';
import ConfirmPopup from '@/features/confirm/ConfirmPopup';
import { HireSure } from '@/features/eng_old/HireSure';
import { MakeDiv } from '@/features/eng_old/MakeDiv';
import { MakeTutor } from '@/features/eng_old/MakeTutor';
import FighterInfoClothes from '@/features/fighter_info/FighterInfoClothes';
import FighterInfoParams from '@/features/fighter_info/FighterInfoParams';
import FighterInfoStats from '@/features/fighter_info/FighterInfoStats';
import FighterInfoTraining from '@/features/fighter_info/FighterInfoTraining';
import FighterInfoTransfer from '@/features/fighter_info/FighterInfoTransfer';
import { FRAME_DIV_TARGET, SECTION_KEY } from '@/sections';
import { useMainStore } from '@/store/mainStore';

// Mock Tooltip if not teleportable in React
// You can use a portal for ConfirmPopup similar to Teleport

const FighterInfo: React.FC = () => {
	const store = useMainStore();
	const club = store.myClub;
	const fighter = store.selectedFighterInfo;

	const [showConfirm, setShowConfirm] = useState(false);

	// Handle navigation back to fighter list
	const handleGoBackToList = (e: React.MouseEvent) => {
		e.preventDefault();
		MakeDiv(FRAME_DIV_TARGET.Left, SECTION_KEY.ClubMembers);
	};

	// Confirm hire/fire action
	const handleHire = (e: React.MouseEvent) => {
		e.preventDefault();
		setShowConfirm(true);
	};

	const confirmHire = () => {
		if (fighter) {
			HireSure(fighter.ID, fighter.Name);
		}
		setShowConfirm(false);
	};

	const cancelHire = () => {
		setShowConfirm(false);
	};

	// Handle tutor click
	const handleTutor = (e: React.MouseEvent) => {
		e.preventDefault();
		MakeTutor('finfo', 0);
	};

	// Calculate total equipment weight
	const getWeight = (): number => {
		if (!fighter || !fighter.Parts) {
			return 0;
		}
		return Object.values(fighter.Parts).reduce(
			(total, part) => total + (part.Weight || 0),
			0,
		);
	};

	// Simulate onMounted
	useEffect(() => {
		// processTitles(); // Uncomment if needed
	}, []);

	if (!fighter) {
		return <div>Loading fighter info...</div>;
	}

	return (
		<div className="fighter-info-wrapper">
			{/* Tooltip (assumed to be global or inline) -- nuxt\ui component */}
			{/* <Tooltip /> /*}

      {/* Confirm Popup (rendered conditionally, possibly via portal) */}
			{showConfirm && (
				<div className="confirm-overlay-container">
					<ConfirmPopup
						message={`Вы уверены, что хотите с треском выгнать бойца по имени ${fighter.Name}?`}
						onConfirm={confirmHire}
						onClose={cancelHire}
					/>
				</div>
			)}

			{/* Fighter ID */}
			<div data-id="fighterid" className="fighter--id">
				{fighter.ID}
			</div>

			{/* Name & Club */}
			{club && (
				<div className="center">
					<b>
						<span className="highlight">{fighter.Name}</span>
					</b>{' '}
					<button type="button" className="href-button" onClick={handleTutor}>
						[?]
					</button>
					<br />
					Клуб: «{club.Club}»
				</div>
			)}

			<hr />

			{/* Back and Hire Buttons */}
			<div className="backarrow">
				<button
					type="button"
					className="href-button"
					onClick={handleGoBackToList}
					title="К списку бойцов"
				>
					<Image src="/img/ret1.png" alt="icon back" />
				</button>
			</div>

			<div className="hirex">
				<button
					type="button"
					className="href-button"
					onClick={handleHire}
					title="Выгнать бойца из клуба"
				>
					<Image src="/img/x3.png" alt="icon fire" />
				</button>
			</div>

			{/* Fighter Photo & Params */}
			<table className="mrgn w-100 cs-0 cp-0">
				<tbody>
					<tr>
						<td style={{ width: '126px' }}>
							<div className="ffoto">
								<span title={`${fighter.Name}`}>
									<Image
										src="/faces/default-face.jpg"
										alt="default-face"
										style={{ width: '100%' }}
									/>
								</span>
							</div>
						</td>
						<td className="pdng" style={{ verticalAlign: 'top' }}>
							<FighterInfoParams info={fighter} />
						</td>
					</tr>
				</tbody>
			</table>

			<hr />

			{/* Win/Loss & Effectiveness */}
			<table className="w-100 cs-0 cp-0">
				<tbody>
					<tr>
						<td style={{ width: '45%' }}>Побед: {fighter.Win}</td>
						<td>
							<span
								className="effectiveness"
								title="Приблизительная эффективность"
							>
								~{fighter.Effectiveness}
							</span>
						</td>
						<td style={{ width: '45%' }} className="al-right">
							Поражений: {fighter.Lose}
						</td>
					</tr>
				</tbody>
			</table>

			<hr />

			{/* Other Sections */}
			<FighterInfoStats fighter={fighter} />
			<hr />
			<FighterInfoTraining id={fighter.ID} />
			<hr />
			<FighterInfoClothes id={fighter.ID} clothes={fighter.Parts} />
			<div>
				&nbsp; Вес снаряжения:
				<span className="dangerous">
					{getWeight()}кг. / {fighter.MaxWeight}кг.
				</span>
			</div>
			<hr />
			<FighterInfoTransfer id={fighter.ID} />
			<hr />

			{/* Return Button */}
			<div className="center">
				<button type="button" className="training" onClick={handleGoBackToList}>
					Вернуться к списку бойцов
				</button>
			</div>
		</div>
	);
};

export default FighterInfo;
