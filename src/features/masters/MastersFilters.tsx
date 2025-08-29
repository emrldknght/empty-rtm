// MastersFilters.tsx
import React from 'react';
import { MakeInfo } from '@/features/eng_old/MakeInfo';

// List of filter items
const FILTERS = [
	{ id: 'weapon', label: 'Оружие' },
	{ id: 'shields', label: 'Щиты' },
	{ id: 'helmets', label: 'Шлемы' },
	{ id: 'torso', label: 'Корпус' },
	{ id: 'shoulderpads', label: 'Плечи' },
	{ id: 'bracers', label: 'Руки' },
	{ id: 'guantlets', label: 'Кисти' },
	{ id: 'cuisses', label: 'Бедра' },
	{ id: 'jambs', label: 'Голени' },
	{ id: 'boots', label: 'Обувь' },
] as const;

const MastersFilters: React.FC = () => {
	const handleClick = (filterId: string) => {
		// Call legacy global function
		MakeInfo('', 'centerdiv', 'masters', '1', filterId);
	};

	const handleAllClick = () => {
		MakeInfo('', 'centerdiv', 'masters', '1', '');
	};

	return (
		<span className="mthing">
			<div style={{ textAlign: 'center' }}>
				{FILTERS.map((filter, index) => (
					<React.Fragment key={filter.id}>
						<button
							type="button"
							className="href-button"
							onClick={(e) => {
								e.preventDefault();
								handleClick(filter.id);
							}}
						>
							<span id={`mthing${filter.id}`}>{filter.label}</span>
						</button>
						{index < FILTERS.length - 1 && ' · '}
					</React.Fragment>
				))}
				<br />
				<button
					type="button"
					className="href-button"
					onClick={(e) => {
						e.preventDefault();
						handleAllClick();
					}}
				>
					<span data-id="mthingall">Все товары</span>
				</button>
			</div>
		</span>
	);
};

export default MastersFilters;
