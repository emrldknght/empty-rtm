// DonateDisplay.tsx
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { donateGet } from '@/api/donateGet';
import ConfirmPopup from '@/features/confirm/ConfirmPopup';
import DonateItem from '@/features/donate/DonateItem';
import { BuyDonate } from '@/features/eng_old/BuyDonate';
import { Exchange } from '@/features/eng_old/Exchange';
import { useMainStore } from '@/store/mainStore';
import type { DonationRecord } from '@/types/DonationRecord';

const DonateDisplay: React.FC = () => {
	const [items, setItems] = useState<DonationRecord[]>([]);
	const [showConfirmPurchase, setShowConfirmPurchase] = useState(false);
	const [purchaseId, setPurchaseId] = useState<DonationRecord['ID'] | null>(
		null,
	);

	const [showConfirmExchange, setShowConfirmExchange] = useState(false);
	const [exchangeAmount, setExchangeAmount] = useState<number>(0.01);

	const { authToken } = useMainStore();

	// Load data on mount
	useEffect(() => {
		const fetchData = async () => {
			if (!authToken) {
				return;
			}

			const res = await donateGet(authToken);
			console.log('donate', res);
			if (res.items) {
				setItems(res.items);
			}
		};

		fetchData();
	}, [authToken]);

	const donatePay = useRef<HTMLDivElement>(null);

	const handleClickDonate = (e: React.MouseEvent) => {
		e.preventDefault();
		// const element = document.getElementById('donatepay');
		if (donatePay.current) {
			// Simulate jQuery slideToggle
			donatePay.current.style.display =
				donatePay.current.style.display === 'none' ? 'block' : 'none';
		}
	};

	const handlePurchase = (id: DonationRecord['ID']) => {
		BuyDonate(id);
		onCancelPurchase();
	};

	const onPurchase = (id: DonationRecord['ID']) => {
		setPurchaseId(id);
		setShowConfirmPurchase(true);
	};

	const onCancelPurchase = () => {
		setShowConfirmPurchase(false);
		setPurchaseId(null);
	};

	const onExchange = () => {
		setShowConfirmExchange(true);
	};

	const handleExchange = () => {
		Exchange(exchangeAmount);
		onCancelExchange();
	};

	const onCancelExchange = () => {
		setShowConfirmExchange(false);
	};

	const confirmContainerRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		confirmContainerRef.current = document.getElementById(
			'confirm-overlay-container',
		) as HTMLDivElement | null;
	}, []);

	return (
		<div>
			{/* Portals for Confirm Popups */}
			{showConfirmPurchase &&
				confirmContainerRef.current &&
				purchaseId &&
				ReactDOM.createPortal(
					<ConfirmPopup
						message="Вы уверены, что хотите приобрести этот предмет?"
						onConfirm={() => handlePurchase(purchaseId)}
						onClose={onCancelPurchase}
					/>,
					confirmContainerRef.current,
				)}
			{showConfirmExchange &&
				confirmContainerRef.current &&
				ReactDOM.createPortal(
					<ConfirmPopup
						message="Вы уверены, что хотите разменять деньги? На рынке, обычно, можно выручить больше."
						onConfirm={handleExchange}
						onClose={onCancelExchange}
					/>,
					confirmContainerRef.current,
				)}
			{/* Hidden location marker */}
			<div className="location" style={{ display: 'none' }}>
				donate
			</div>
			{/* Header */}
			<table className="w-100 cs-0">
				<tbody>
					<tr className="tableheader">
						<td>
							<b>&nbsp;Всякие платные штуки: </b>
						</td>
						<td className="highlight al-right">
							<button
								type="button"
								onClick={handleClickDonate}
								className="dntp highlight href-button"
							>
								Занести денег&nbsp;
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			{/* Donate Payment Toggle Section */}
			<div ref={donatePay} style={{ display: 'none' }}>
				Да рано еще, вы чего? ;о)
			</div>
			<br />
			<hr />
			{/* Donation Items */}
			<table className="w-100">
				<tbody>
					<tr>
						{items.map((item) => (
							<DonateItem key={item.ID} item={item} onPurchase={onPurchase} />
						))}
					</tr>
				</tbody>
			</table>
			<hr />
			{/* Exchange Section */}
			&nbsp; <span className="highlight">Разменять деньги:</span>
			<br />
			<br />
			&nbsp;
			<input
				type="number"
				step="0.01"
				min="0.01"
				value={exchangeAmount}
				onChange={(e) => {
					const val = parseFloat(e.target.value);
					setExchangeAmount(Number.isNaN(val) || val < 0.01 ? 0.01 : val);
				}}
				size={3}
				className="exchange--rubles training"
				style={{ maxWidth: '100px' }}
			/>
			&nbsp;
			<span title="Курс размена 1 к 10">
				<input
					type="button"
					className="training"
					value="Разменять"
					onClick={onExchange}
				/>
			</span>
			<hr />
		</div>
	);
};

export default DonateDisplay;
