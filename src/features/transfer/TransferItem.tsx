// src/features/transfer/TransferItem.tsx

import Image from 'next/image';
import type React from 'react';
import type { FighterRecord } from '@/types/Fighter';

interface TransferItemProps {
	fighter: FighterRecord;
	isMine: boolean;
	onAction: () => void;
}

export const TransferItem: React.FC<TransferItemProps> = ({
	fighter,
	isMine,
	onAction,
}) => {
	const age = fighter.Age;
	const isOld = age + 1 >= fighter.OldAge;
	const effectiveness =
		fighter.Effectiveness || calculateEffectiveness(fighter);

	const buyFighter = async () => {
		if (
			!window.confirm(`Купить бойца "${fighter.Name}" за $${fighter.Transfer}?`)
		) {
			return;
		}

		try {
			const res = await fetch('/a.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: `buyfighter=${fighter.ID}`,
			});
			const text = await res.text();
			if (text.toLowerCase().includes('success') || text.includes('куплен')) {
				alert('Боец успешно куплен!');
				onAction(); // Refresh list
			} else {
				alert(
					'Не удалось купить: ' +
						(text.length < 200 ? text : 'Ошибка на сервере'),
				);
			}
		} catch (err) {
			alert(`Сетевая ошибка при покупке.${(err as Error).message}`);
		}
	};

	const sellFighter = async () => {
		try {
			const res = await fetch('/a.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: `transfer_sell=${fighter.ID}`,
			});
			if (res.ok) {
				alert('Боец снят с трансфера.');
				onAction();
			}
		} catch (err) {
			alert(`Ошибка при снятии с трансфера.${(err as Error).message}`);
		}
	};

	return (
		<div style={cardStyle}>
			{/* Header */}
			<div style={headerStyle}>
				<span>
					<a
						href={`/info.php?f=${fighter.ID}`}
						target="_blank"
						style={{ fontWeight: 'bold' }}
					>
						{fighter.Name}
					</a>{' '}
					[
					<a href={`/info.php?${fighter.Master}`} target="_blank">
						{fighter.Club}
					</a>
					]
					{fighter.Busy ? (
						<span title="Боец занят" style={iconStyle}>
							⚔
						</span>
					) : null}
					{fighter.Trauma ? (
						<span
							title={fighter.Trauma}
							style={{ ...iconStyle, color: 'orange' }}
						>
							+
						</span>
					) : null}
				</span>
				<span style={{ color: 'green' }}>~{effectiveness}</span>
			</div>

			{/* Stats */}
			<div style={bodyStyle}>
				{/* Image */}
				<div style={{ width: '126px', textAlign: 'center' }}>
					<Image
						src={fighter.Img}
						width="100"
						height="120"
						alt={fighter.Name}
						title={fighter.Name}
					/>
				</div>

				{/* Main Stats */}
				<div style={statsSection}>
					<table>
						<tbody>
							<tr>
								<td>Возраст:</td>
								<td>
									<span
										style={isOld ? { color: 'red', fontWeight: 'bold' } : {}}
									>
										{age}
									</span>
								</td>
							</tr>
							<tr>
								<td>Рост:</td>
								<td>{fighter.Height} см</td>
							</tr>
							<tr>
								<td>Вес:</td>
								<td>{fighter.Weight} кг</td>
							</tr>
							<tr>
								<td>Сила:</td>
								<td>
									<span className="s">{fighter.Strength}</span>
								</td>
							</tr>
							<tr>
								<td>Ловкость:</td>
								<td>
									<span className="d">{fighter.Dexterity}</span>
								</td>
							</tr>
							<tr>
								<td>Выносливость:</td>
								<td>
									<span className="st">{fighter.Stamina}</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* Skills */}
				<div style={statsSection}>
					<table>
						<tbody>
							<tr>
								<td>Одноручный меч:</td>
								<td>{fighter.Sword}</td>
							</tr>
							<tr>
								<td>Щит:</td>
								<td>{fighter.Shield}</td>
							</tr>
							<tr>
								<td>Полутораручный меч:</td>
								<td>{fighter.Bastard}</td>
							</tr>
							<tr>
								<td>Дробящее оружие:</td>
								<td>{fighter.MorningStar}</td>
							</tr>
							<tr>
								<td>Древковое оружие:</td>
								<td>{fighter.PoleArm}</td>
							</tr>
							<tr>
								<td>Борьба:</td>
								<td>{fighter.Wrestling}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			{/* Action Button */}
			<div style={actionStyle}>
				{isMine ? (
					<button
						type="button"
						className="training"
						onClick={sellFighter}
						style={buttonStyle}
					>
						Снять с трансфера (выставлен за ${fighter.Transfer})
					</button>
				) : (
					<button
						type="button"
						className="training"
						onClick={buyFighter}
						style={buttonStyle}
					>
						Заключить контракт (${fighter.Transfer})
					</button>
				)}
			</div>

			<hr style={{ margin: '0', borderColor: '#eee' }} />
		</div>
	);
};

// ------------------------------
// Helper: Calculate Effectiveness (fallback)
// ------------------------------
function calculateEffectiveness(f: FighterRecord) {
	return Math.round(
		(f.Strength * 0.3 + f.Dexterity * 0.3 + f.Stamina * 0.4) *
			(1 + f.Sword * 0.01 + f.PoleArm * 0.01 + f.Wrestling * 0.01),
	);
}

// ------------------------------
// Styles (can be moved to CSS later)
// ------------------------------
const cardStyle: React.CSSProperties = {
	border: '1px solid #ccc',
	borderRadius: '8px',
	overflow: 'hidden',
	marginBottom: '12px',
	backgroundColor: '#fff',
};

const headerStyle: React.CSSProperties = {
	background: '#f0f0f0',
	padding: '8px 12px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	fontSize: '14px',
};

const bodyStyle: React.CSSProperties = {
	display: 'flex',
	padding: '12px',
	gap: '12px',
	fontSize: '13px',
};

const statsSection: React.CSSProperties = {
	flex: 1,
};

const actionStyle: React.CSSProperties = {
	textAlign: 'center',
	padding: '8px',
};

const buttonStyle: React.CSSProperties = {
	padding: '6px 12px',
	fontSize: '13px',
};

const iconStyle: React.CSSProperties = {
	marginLeft: '6px',
	fontWeight: 'bold',
};
