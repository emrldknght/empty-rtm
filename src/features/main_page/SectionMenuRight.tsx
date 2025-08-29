// SectionMenuRight.tsx

import { MAKE_DIV_TARGET, MakeDiv } from '@/features/eng_old/MakeDiv';
import { SECTION_KEY } from '@/sections'; // Adjust path as needed
import SectionMenuItem, { type SectionMenuItemProps } from './SectionMenuItem';

// Default inline style for right-side menu items
const RIGHT_ITEM_STYLE = {
	// float: 'left' as const,
	cursor: 'pointer',
	background: '#222',
};

// Menu items configuration
const ITEMS: SectionMenuItemProps[] = [
	{
		id: 'menudonate',
		label: 'Донат',
		action: async () => {
			await MakeDiv(MAKE_DIV_TARGET.Center, SECTION_KEY.Donate);
		},
		title: 'Анальный, ессесна!',
	},
	{
		id: 'whitespace_1',
		label: '',
		action: () => {},
		style: {
			width: '28px',
			// float: 'left' as const,
			border: 'none',
			cursor: 'default',
		},
	},
	{
		id: 'menutransfer',
		label: 'Трансфер',
		action: async () => {
			await MakeDiv(MAKE_DIV_TARGET.Center, SECTION_KEY.Transfer);
		},
	},
	{
		id: 'menufreefighters',
		label: 'Рекруты',
		action: async () => {
			await MakeDiv(MAKE_DIV_TARGET.Center, SECTION_KEY.FreeFighters);
		},
	},
];

const SectionMenuRight = () => {
	return (
		<div data-id="upright" className="upright container__up-menu">
			{ITEMS.map((item) => (
				<SectionMenuItem
					key={item.id}
					id={item.id}
					label={item.label}
					action={item.action}
					style={item.style || RIGHT_ITEM_STYLE}
					title={item.title}
				>
					{/* Optional: insert icons or prefixes here */}
				</SectionMenuItem>
			))}
		</div>
	);
};

export default SectionMenuRight;
