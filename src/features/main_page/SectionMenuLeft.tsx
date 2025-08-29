// SectionMenuLeft.tsx
// import { computed } from 'nanostores'; // ⚠️ Or use React + Zustand/Pinia — see note below
import { useMemo } from 'react';
import { MAKE_DIV_TARGET, MakeDiv } from '@/features/eng_old/MakeDiv';
import SectionMenuItem, {
	type SectionMenuItemProps,
} from '@/features/main_page/SectionMenuItem';
import { SECTION_KEY } from '@/sections';
import { useMainStore } from '@/store/mainStore';

// 🔁 Note: If you're using standard Pinia with React, ensure it's initialized properly.
// This example assumes Pinia works in React (common in Nuxt/Vue hybrid or custom setups).
// Alternatively, consider migrating to Zustand or React Context for full React compatibility.

const ITEMS: Omit<SectionMenuItemProps, 'style'>[] = [
	{
		id: 'menuclubs',
		label: 'Клубы',
		action: async () => {
			await MakeDiv(MAKE_DIV_TARGET.Center, SECTION_KEY.Clubs);
		},
	},
	{
		id: 'menumyclub',
		label: 'Мой клуб',
		action: async () => {
			await MakeDiv(MAKE_DIV_TARGET.Left, SECTION_KEY.MyClub);
		},
	},
	{
		id: 'menuclubmembers',
		label: 'Бойцы',
		action: async () => {
			await MakeDiv(MAKE_DIV_TARGET.Left, SECTION_KEY.ClubMembers);
		},
	},
	{
		id: 'menucombatlist',
		label: 'Мои бои',
		action: async () => {
			await MakeDiv(MAKE_DIV_TARGET.Left, SECTION_KEY.CombatList);
		},
	},
	{
		id: 'menubase',
		label: 'База',
		action: async () => {
			await MakeDiv(MAKE_DIV_TARGET.Center, SECTION_KEY.Base);
		},
	},
];

const LEFT_ITEM_STYLE = {
	float: 'left' as const,
	cursor: 'pointer',
	background: '#222',
};

const SectionMenuLeft = () => {
	const store = useMainStore();

	// Equivalent to Vue’s `computed(() => store.sections.Left)`
	const sectionLeft = useMemo(() => store.sections.Left, [store.sections.Left]);

	// Generate items with dynamic `className` (like Vue’s :class)
	const renderedItems = ITEMS.map((item) => {
		const isActive = item.id === `menu${sectionLeft}`;
		const itemClass = isActive ? 'active' : undefined;

		return (
			<SectionMenuItem
				key={item.id}
				id={item.id}
				label={item.label}
				action={item.action}
				style={LEFT_ITEM_STYLE}
				className={itemClass} // ← New prop needed in SectionMenuItem
			/>
		);
	});

	return (
		<div data-id="upleft" className="upleft container__up-menu">
			{renderedItems}
		</div>
	);
};

export default SectionMenuLeft;
