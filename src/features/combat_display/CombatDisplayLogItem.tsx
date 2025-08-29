// CombatDisplayLogItem.tsx

import parse from 'html-react-parser';
import { forwardRef } from 'react';
import type { CombatRecord } from '@/types/CombatRecord';

interface CombatDisplayLogItemProps {
	item: CombatRecord;
}

const CombatDisplayLogItem = forwardRef<
	HTMLDivElement,
	CombatDisplayLogItemProps
>(({ item }, ref) => {
	return (
		<div ref={ref} className="cd-li-wrapper">
			{parse(item.Text)}
		</div>
	);
});

CombatDisplayLogItem.displayName = 'CombatDisplayLogItem';

export default CombatDisplayLogItem;
