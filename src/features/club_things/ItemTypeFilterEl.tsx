// ItemTypeFilterEl.tsx
import type React from 'react';
import { l } from '@/locales';
import type { BodyPart, ItemTypes, WeaponTypes } from '@/types/Item';

type Props = {
	label: string;
	filter: string;
	types: typeof ItemTypes | typeof WeaponTypes | typeof BodyPart;
	onUpdateFilter: (type: ItemTypes | WeaponTypes | BodyPart) => void;
};

// todo - check typings

export const ItemTypeFilterEl: React.FC<Props> = ({
	label,
	filter,
	types,
	onUpdateFilter,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		// todo - check types
		onUpdateFilter(e.target.value as ItemTypes);
	};

	return (
		<label className="row" style={{ gap: 8 }}>
			<span>{label}</span>
			<select value={filter} onChange={handleChange}>
				{Object.entries(types).map(([key, value]) => (
					<option key={key} value={value}>
						{l(key)}
					</option>
				))}
			</select>
		</label>
	);
};
