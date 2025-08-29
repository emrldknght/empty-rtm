// MyBase.tsx
import React, { useEffect } from 'react';
import BaseItem from '@/features/base/BaseItem';
import { useBaseStore } from '@/features/base/baseStore';

const MyBase: React.FC = () => {
	const { fetchMyBase, baseList, currentId, currentBase, watchers } =
		useBaseStore();

	// Fetch data on mount
	useEffect(() => {
		fetchMyBase();
	}, [fetchMyBase]);

	if (!currentBase) {
		return <div>Loading...</div>;
	}

	return (
		<div className="base-wrapper">
			<div className="tableheader highlight">Тренировочная база:</div>

			{baseList.map((base) => (
				<React.Fragment key={base.ID}>
					<div style={{ height: '3px', border: 'none', margin: 0 }} />
					<BaseItem
						baseItem={base}
						myBase={currentBase}
						watchers={watchers}
						isCurrent={base.ID === currentId}
					/>
				</React.Fragment>
			))}
		</div>
	);
};

export default MyBase;
