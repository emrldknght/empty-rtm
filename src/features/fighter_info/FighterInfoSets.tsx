// FighterInfoSets.tsx
import type React from 'react';
import { useEffect, useState } from 'react';
import { itemsPacksGet } from '@/api/itemsPacksGet';
import { ThingComplect } from '@/features/eng_old/ThingComplect';
import { Undress } from '@/features/eng_old/Undress';
import { useMainStore } from '@/store/mainStore';
import type { FighterRecord } from '@/types/Fighter';
import type { ItemsPackRecord } from '@/types/ItemsPackRecord';

interface FighterInfoSetsProps {
	id: FighterRecord['ID'];
}

const SETS = [0, 1, 2, 3, 4, 5];
const DEFAULT_PACKS: ItemsPackRecord = {
	User: 0,
	C1: '',
	C2: '',
	C3: '',
	C4: '',
	C5: '',
	C6: '',
};

const FighterInfoSets: React.FC<FighterInfoSetsProps> = ({ id }) => {
	const { authToken } = useMainStore();
	const [packs, setPacks] = useState<ItemsPackRecord>(DEFAULT_PACKS);
	const [_loading, setLoading] = useState(true);

	/*
	if (!authToken) {
		return null; // todo - check return
	}
	 */

	useEffect(() => {
		const loadPacks = async () => {
			if (!authToken) {
				return;
			}

			setLoading(true);
			try {
				const data = await itemsPacksGet(authToken);
				setPacks(data);
			} catch (error) {
				console.error('Failed to load item packs:', error);
				setPacks(DEFAULT_PACKS);
			}
			setLoading(false);
		};

		loadPacks();
	}, [authToken]);

	const handleClickSet = (setId: number) => {
		ThingComplect(setId);
	};

	const handleUndressAll = (e: React.MouseEvent) => {
		e.preventDefault();
		Undress(id);
	};

	const getClassName = (setId: number) => {
		if (Object.keys(packs).length === 0) {
			return 'complectbutton';
		}

		const packKey = `C${setId + 1}` as keyof ItemsPackRecord;
		const isPack = !!(packs as ItemsPackRecord)[packKey];

		return `complectbutton ${isPack ? 'complect-button--filled' : ''}`;
	};

	return (
		<>
			<div className="thingcomplects" style={{ textAlign: 'center' }}>
				{SETS.map((setId) => (
					<button
						key={setId}
						type="button"
						className={`${getClassName(setId)} href-button`}
						onClick={() => handleClickSet(setId)}
					>
						{setId}
					</button>
				))}
			</div>

			<div
				className="things-complex"
				style={{ textAlign: 'center', marginTop: '8px' }}
			>
				<button
					type={'button'}
					onClick={handleUndressAll}
					className="undress-button"
				>
					Снять всё
				</button>
			</div>
		</>
	);
};

export default FighterInfoSets;
