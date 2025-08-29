// MastersDisplay.tsx
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ConfirmPopup from '@/features/confirm/ConfirmPopup';
import { MakeInfo } from '@/features/eng_old/MakeInfo';
import { MakeThingMenu } from '@/features/eng_old/MakeThingMenu';
import { LoaderComponent } from '@/features/loader/LoaderComponent';
import MastersSets from '@/features/masters/MasterSets';
import MastersFilters from '@/features/masters/MastersFilters';
import MastersForges from '@/features/masters/MastersForges';
import MastersItem from '@/features/masters/MastersItem';
import PagingDisplay from '@/features/paging/PagingDisplay';
import { FRAME_DIV_TARGET, SECTION_KEY } from '@/sections';
import { useMastersStore } from '@/store/mastersStore';
import type { MasterThingsRecord } from '@/types/Masters';

const MastersDisplay: React.FC = () => {
	const { items, count, page, loading, fetchMasters, buyItem } =
		useMastersStore();

	const [showConfirm, setShowConfirm] = useState(false);
	const [purchaseId, setPurchaseId] = useState<number>(-1);
	const [purchaseAmount, setPurchaseAmount] = useState<number>(1);

	// On mount
	useEffect(() => {
		MakeThingMenu('');
		fetchMasters();
	}, [fetchMasters]);

	const handleTogglePurchaseSet = () => {
		// const element = document.getElementById('complectslist');
		const element = document.querySelector(
			'[data-id="complectslist"]',
		) as HTMLDivElement | null;
		if (element) {
			// Simulate jQuery slideToggle with basic toggle
			element.style.display =
				element.style.display === 'none' ? 'block' : 'none';
		}
	};

	const handleSetPage = async (_newPage: number) => {
		await MakeInfo('', FRAME_DIV_TARGET.Center, SECTION_KEY.Masters, 2, '');
		// Note: page change doesn't trigger fetch here unless you want it to
		// If needed: await fetchMasters() or store.setPage(newPage)
	};

	const handlePurchase = ({ id, amount }: { id: number; amount: number }) => {
		setShowConfirm(true);
		setPurchaseId(id);
		setPurchaseAmount(amount);
	};

	const onCancelPurchase = () => {
		setShowConfirm(false);
		setPurchaseId(-1);
		setPurchaseAmount(1);
	};

	const onPurchase = async () => {
		await buyItem(purchaseId, purchaseAmount);
		onCancelPurchase();
	};

	const onForge = (_forgeId: string) => {
		// todo - make select forge
		// onForge(forgeId);
	};

	const confirmTextOne = 'Вы уверены, что хотите приобрести этот предмет?';
	const confirmTextMany = `Вы уверены, что хотите приобрести этот предмет в количестве ${purchaseAmount} шт.?`;

	const confirmContainerRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		confirmContainerRef.current = document.getElementById(
			'confirm-overlay-container',
		) as HTMLDivElement | null;
	}, []);

	return (
		<div>
			{/* Tooltip / Confirm Portal */}
			{showConfirm &&
				confirmContainerRef.current &&
				ReactDOM.createPortal(
					<ConfirmPopup
						message={purchaseAmount > 1 ? confirmTextMany : confirmTextOne}
						onConfirm={onPurchase}
						onClose={onCancelPurchase}
					/>,
					confirmContainerRef.current,
				)}

			{/* Header with Toggle */}
			<table className="w-100 cs-0 cp-0">
				<tbody>
					<tr className="tableheader">
						<td className="al-left">
							<b>&nbsp;Магазин:</b>
						</td>
						<td className="al-right">
							<button
								type="button"
								data-id="appl"
								className="href-button"
								onClick={(e) => {
									e.preventDefault();
									handleTogglePurchaseSet();
								}}
							>
								<span className="highlight"> Купить комплект&nbsp;</span>
							</button>
						</td>
					</tr>
					<tr>
						<td colSpan={2}>
							<MastersSets />
						</td>
					</tr>
				</tbody>
			</table>

			<MastersForges onForge={onForge} />

			{/* Info about sets */}
			<span title="Комплектами приобретаются только доспехи. Оружие и/или щиты вам необходимо приобрести отдельно согласно навыкам вашего бойца!">
				<button
					type="button"
					className="href-button"
					style={{
						width: 250,
						margin: '0 auto',
						textAlign: 'center',
						cursor: 'pointer',
					}}
					onClick={handleTogglePurchaseSet}
				>
					Купить сразу комплектом
				</button>
			</span>

			<hr />

			<MastersFilters />

			<PagingDisplay
				currentPage={page}
				totalItems={count}
				itemsOnPage={count} // Note: this may be a typo in original (found → count?)
				onPageChange={handleSetPage}
			/>

			{/* Loader */}
			{loading && <LoaderComponent />}

			{/* Items Table */}
			{!loading && (
				<table className="mark1 w-100 cs-0 cp-0">
					<tbody>
						<tr>
							<td colSpan={4}>
								<b>&nbsp;Все мастерские [::::]</b>
							</td>
						</tr>
						{items.map((item: MasterThingsRecord) => (
							<MastersItem
								key={item.ID}
								item={item}
								onPurchase={handlePurchase}
							/>
						))}
					</tbody>
				</table>
			)}

			{/* Bottom Pagination (example with fixed values) */}
			<PagingDisplay
				currentPage={1}
				totalItems={21 * 30}
				itemsOnPage={30}
				onPageChange={handleSetPage}
			/>
		</div>
	);
};

export default MastersDisplay;
