// BaseItem.tsx
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import BaseInventoryItem from '@/features/base/BaseInventoryItem';
import ConfirmPopup from '@/features/confirm/ConfirmPopup';
import { BuyBase } from '@/features/eng_old/BuyBase';
import { SetTicketCost } from '@/features/eng_old/SetTicketCost';
import type { BaseRecord, BaseTemplateRecord } from '@/types/Base';
import { WButton } from '@/ui/WButton';

// Props interface
interface BaseItemProps {
	baseItem: BaseTemplateRecord;
	myBase: BaseRecord;
	watchers: number;
	isCurrent: boolean;
}

const BaseItem: React.FC<BaseItemProps> = ({
	baseItem,
	myBase,
	watchers,
	isCurrent,
}) => {
	const [showConfirm, setShowConfirm] = useState(false);

	const handleSetTicketCost = () => {
		const input = document.getElementById('ticketcost') as HTMLInputElement;
		const value = input?.value;
		if (value) {
			SetTicketCost(value);
		}
	};

	const handleClickBuyBase = () => {
		setShowConfirm(true);
	};

	const handleConfirmMove = () => {
		BuyBase(baseItem.ID);
		setShowConfirm(false);
	};

	const handleCancelMove = () => {
		setShowConfirm(false);
	};

	const confirmContainerRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		confirmContainerRef.current = document.getElementById(
			'confirm-overlay-container',
		) as HTMLDivElement | null;
	}, []);

	return (
		<div style={{ border: '1px solid #9f9f9f' }}>
			{/* Confirm Modal Portal */}
			{showConfirm &&
				confirmContainerRef.current &&
				ReactDOM.createPortal(
					<ConfirmPopup
						message=""
						onConfirm={handleConfirmMove}
						onClose={handleCancelMove}
					>
						<div className="confirm-content">
							Вы уверены, что хотите переехать?
							<br />
							Весь инвентарь, который не влезет в новое помещение - пропадет!
						</div>
					</ConfirmPopup>,
					confirmContainerRef.current,
				)}

			{/* Base Info Table */}
			<table
				className={`$addon w-100 ${!isCurrent ? 'darked' : ''}`}
				style={{ margin: 0 }}
			>
				<tbody>
					<tr>
						{/* Image */}
						<td style={{ width: '130px' }}>
							<div
								className="ffoto"
								style={{ backgroundImage: `url(img/base/${baseItem.Img})` }}
							>
								<div className="dresseddef baseplace">{baseItem.Name}</div>
							</div>
						</td>

						{/* Stats */}
						<td className="v-top">
							<div className="mark3 w-100 cs-0 col">
								<div>
									<span className="v-top">Привлекательность для зрителей:</span>
									<span className="al-right v-top">{baseItem.Attraction}</span>
								</div>
								<div>
									<span className="v-top">Площадь:</span>
									<span className="al-right v-top">{baseItem.Square} м²</span>
								</div>
								<div>
									<span className="v-top">Рекламная площадь:</span>
									<span className="al-right v-top">
										{baseItem.AdvSquare} м²
									</span>
								</div>
								<div>
									<span className="v-top">Бойцов:</span>
									<span className="al-right v-top">
										{baseItem.Fighters * 2} чел.
									</span>
								</div>
								<div>
									<span className="v-top">Зрителей:</span>
									<span className="al-right v-top">
										{watchers} / {baseItem.Watchers} чел.
									</span>
								</div>
								<div>
									<span className="v-top">Аренда:</span>
									<span className="al-right v-top">{baseItem.Rent}/сут.</span>
								</div>

								{/* Move or Set Ticket */}
								{!isCurrent ? (
									<div>
										<span className="v-top">Переезд:</span>
										<span className="al-right v-top">
											<WButton
												type="button"
												className="training"
												style={{ opacity: 1 }}
												label={`$ ${baseItem.Cost}`}
												onClick={handleClickBuyBase}
											/>
										</span>
									</div>
								) : (
									<div>
										<span className="v-top">Цена билета:</span>
										<span className="al-right v-top">
											$
											<input
												data-id="ticketcost"
												type="text"
												maxLength={5}
												size={3}
												className="training"
												defaultValue={myBase.Ticket}
												pattern="\d{1,2}\.\d{1,2}"
												placeholder="00.00"
											/>
											<WButton
												type="button"
												className="training"
												label="ОК"
												onClick={handleSetTicketCost}
											/>
										</span>
									</div>
								)}
							</div>
						</td>
					</tr>
				</tbody>
			</table>

			{/* Inventory Section */}
			<div
				data-id={`lbase_${baseItem.ID}`}
				className={`mark4 w-100 cs-0 col ${!isCurrent ? 'darked' : ''}`}
			>
				<div className="al-center">Имущество:</div>

				<BaseInventoryItem
					itemKey="chair"
					label="Стулья"
					amount={myBase.Chair}
					maxAmount={baseItem.MaxChair}
					cost={baseItem.ChairCost}
					isCurrent={isCurrent}
				/>
				<BaseInventoryItem
					itemKey="bench"
					label="Скамьи"
					amount={myBase.Bench}
					maxAmount={baseItem.MaxBench}
					cost={baseItem.BenchCost}
					isCurrent={isCurrent}
				/>
				<BaseInventoryItem
					itemKey="recliner"
					label="Ряды кресел"
					amount={myBase.Recliner}
					maxAmount={baseItem.MaxRecliner}
					cost={baseItem.ReclinerCost}
					isCurrent={isCurrent}
				/>
				<BaseInventoryItem
					itemKey="coltribune"
					label="Разборные трибуны"
					amount={myBase.ColTribune}
					maxAmount={baseItem.MaxColTribune}
					cost={baseItem.ColTribuneCost}
					isCurrent={isCurrent}
				/>
				<BaseInventoryItem
					itemKey="tribune"
					label="Трибуны"
					amount={myBase.Tribune}
					maxAmount={baseItem.MaxTribune}
					cost={baseItem.TribuneCost}
					isCurrent={isCurrent}
				/>
				<BaseInventoryItem
					itemKey="sector"
					label="Секторы"
					amount={myBase.Sector}
					maxAmount={baseItem.MaxSector}
					cost={baseItem.SectorCost}
					isCurrent={isCurrent}
				/>
				<BaseInventoryItem
					itemKey="container"
					label="Грузовые контейнеры"
					amount={myBase.Container}
					maxAmount={baseItem.MaxContainer}
					cost={baseItem.ContainerCost}
					isCurrent={isCurrent}
				/>
			</div>
		</div>
	);
};

export default BaseItem;
