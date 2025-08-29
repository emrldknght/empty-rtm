// RecruitsDisplay.tsx
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ConfirmPopup from '@/features/confirm/ConfirmPopup';
import { MakeInfo } from '@/features/eng_old/MakeInfo';
import { MakeTutor } from '@/features/eng_old/MakeTutor';
import { RecruitSure } from '@/features/eng_old/RecruitSure';
import PagingDisplay from '@/features/paging/PagingDisplay';
import RecruitsDisplayHeader from '@/features/recruits/RecruitsDisplayHeader';
import RecruitsDisplayItem from '@/features/recruits/RecruitsDisplayItem';
import { useRecruitsStore } from '@/features/recruits/recruitsStore';
import { FRAME_DIV_TARGET, SECTION_KEY } from '@/sections';
import type { FighterRecord } from '@/types/Fighter';

const RecruitsDisplay: React.FC = () => {
	const { recruits, count, page, fetchRecruits } = useRecruitsStore();

	const [showConfirm, setShowConfirm] = useState(false);
	const [selectedRecruit, setSelectedRecruit] = useState<FighterRecord | null>(
		null,
	);

	// Load recruits on mount
	useEffect(() => {
		fetchRecruits();
	}, [fetchRecruits]);

	const handleSetPage = async (newPage: number) => {
		useRecruitsStore.getState().setPage(newPage);

		await MakeInfo(
			'',
			FRAME_DIV_TARGET.Center,
			SECTION_KEY.FreeFighters,
			newPage,
			'',
		);
	};

	const handleRecruit = (fighter: FighterRecord) => {
		setSelectedRecruit(fighter);
		setShowConfirm(true);
	};

	const cancelRecruit = () => {
		setSelectedRecruit(null);
		setShowConfirm(false);
	};

	const processRecruit = async () => {
		if (!selectedRecruit) {
			return;
		}
		await RecruitSure(selectedRecruit.ID, selectedRecruit.Name);
		cancelRecruit();
	};

	const clickTutor = (e: React.MouseEvent) => {
		e.preventDefault();
		MakeTutor('freefighters', 0);
	};

	const confirmContainerRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		confirmContainerRef.current = document.getElementById(
			'confirm-overlay-container',
		) as HTMLDivElement | null;
	}, []);

	return (
		<div>
			{/* Tutor Help Button (top-right) */}
			<div
				className="al-right"
				style={{
					border: 'none',
					position: 'absolute',
					top: '10px',
					right: '10px',
				}}
			>
				<button type="button" className="href-button" onClick={clickTutor}>
					[?]
				</button>
			</div>

			{/* Confirm Popup Portal */}
			{showConfirm &&
				confirmContainerRef.current &&
				ReactDOM.createPortal(
					<ConfirmPopup
						message={`Вы уверены, что хотите чтобы ${selectedRecruit?.Name} присоединился к вашему клубу?<br>Официальное приглашение стоит $10.`}
						onConfirm={processRecruit}
						onClose={cancelRecruit}
					/>,
					confirmContainerRef.current,
				)}

			{/* Top Pagination */}
			<PagingDisplay
				currentPage={page}
				totalItems={count}
				itemsOnPage={30}
				onPageChange={handleSetPage}
			/>

			{/* Recruits Table */}
			<table className="mark1 w-100">
				<tbody>
					<RecruitsDisplayHeader
						sort=""
						sortOrderDesc={true}
						onSort={(_sort) => {}}
						// Note: sorting not yet implemented — could pass handlers if needed
					/>
					{recruits.map((recruit) => (
						<RecruitsDisplayItem
							key={recruit.ID}
							fighter={recruit}
							onRecruit={handleRecruit}
						/>
					))}
				</tbody>
			</table>

			{/* Bottom Pagination */}
			<PagingDisplay
				currentPage={page}
				totalItems={count}
				itemsOnPage={30}
				onPageChange={handleSetPage}
			/>
		</div>
	);
};

export default RecruitsDisplay;
