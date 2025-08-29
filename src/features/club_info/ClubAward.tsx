// ClubAward.tsx

import Image from 'next/image';
import type React from 'react';
import { API_PATH } from '@/api/const';
import type { AwardRecord } from '@/types/AwardRecord';

type Props = {
	award: AwardRecord;
};

const ClubAward: React.FC<Props> = ({ award }) => {
	const title = `<b>${award.AwardName}</b><br>${award.AwardText}`;
	const src = `${API_PATH}/img/awards/${award.AwardImage}`;

	return (
		<span title={title} style={{ display: 'inline-block' }}>
			<Image
				src={src}
				alt="award icon"
				style={{ height: '24px', width: 'auto' }}
				height={24}
				width={24}
			/>
		</span>
	);
};

export default ClubAward;
