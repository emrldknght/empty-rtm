// ItemInfoGraph.tsx

import Image from 'next/image';
import type React from 'react';

import { getItemInfoGraph } from '@/features/items/getItemInfoGraph';
import type { ItemRecord } from '@/types/Item';
import type { MasterThingsRecord } from '@/types/Masters';

interface ItemInfoGraphProps {
	item: ItemRecord | MasterThingsRecord;
}

const ItemInfoGraph: React.FC<ItemInfoGraphProps> = ({ item }) => {
	const ig = getItemInfoGraph(item.BodyPart);

	return ig ? (
		<Image
			className="infograph"
			src={`/img/infograph/${ig}.png`}
			alt="infograph"
		/>
	) : (
		<span />
	);
};

export default ItemInfoGraph;
