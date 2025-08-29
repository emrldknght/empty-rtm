// SectionMenuCenter.tsx

import { MAKE_DIV_TARGET, MakeDiv } from '@/features/eng_old/MakeDiv';
import SectionMenuItem, {
	type SectionMenuItemProps,
} from '@/features/main_page/SectionMenuItem';
import { SECTION_KEY } from '@/sections';

// Define the menu items (same as Vue version)
const ITEMS: SectionMenuItemProps[] = [
	{
		id: 'menufrendlycombats',
		label: 'Дружеские',
		action: async () => {
			await MakeDiv(MAKE_DIV_TARGET.Center, SECTION_KEY.FriendlyCombats);
		},
	},
	{
		id: 'menuchampionship',
		label: 'Чемпионат',
		action: async () => {
			await MakeDiv(MAKE_DIV_TARGET.Center, SECTION_KEY.Championship);
		},
	},
	{
		id: 'menu_fest',
		label: 'Фестивали',
		action: async () => {
			await MakeDiv('', '');
		},
	},
	{
		id: 'whitespace_1',
		label: '',
		action: () => {},
		style: {
			width: '20px',
			paddingBottom: '4px',
			// float: 'left', todo - chaeck float
			border: 'none',
			cursor: 'default',
		},
	},
	{
		id: 'menuclubthings',
		label: 'Склад',
		action: async () => {
			await MakeDiv(MAKE_DIV_TARGET.Center, SECTION_KEY.ClubThings);
		},
	},
	{
		id: 'menumarket',
		label: 'Рынок',
		action: async () => {
			await MakeDiv(MAKE_DIV_TARGET.Center, SECTION_KEY.Market);
		},
	},
	{
		id: 'menumasters',
		label: 'Магазин',
		action: async () => {
			await MakeDiv(MAKE_DIV_TARGET.Center, SECTION_KEY.Masters);
		},
	},
	{
		id: 'menurepair',
		label: 'Мастерская',
		action: async () => {
			await MakeDiv(MAKE_DIV_TARGET.Center, SECTION_KEY.Repair);
		},
	},
];

// Default style for center items
const CENTER_ITEM_STYLE = {
	paddingBottom: '4px',
	// float: 'left', // todo - check float
	cursor: 'pointer',
	background: '#222',
} as const;

const SectionMenuCenter = () => {
	return (
		<div data-id="upcenter" className="upcenter container__up-menu">
			{ITEMS.map((item) => (
				<SectionMenuItem
					key={item.id}
					id={item.id}
					label={item.label}
					action={item.action}
					style={item.style || CENTER_ITEM_STYLE}
					title={item.title}
				>
					{/* If you want to pass icons or prefix content, do it here
          {item.id.startsWith('menu') && <span style={{ marginRight: '4px' }}>⚡</span>}
           */}
				</SectionMenuItem>
			))}
		</div>
	);
};

export default SectionMenuCenter;
