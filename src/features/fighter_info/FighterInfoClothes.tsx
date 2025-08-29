// FighterInfoClothes.tsx
import type React from 'react';
import FighterInfoClothesSlot from '@/features/fighter_info/FighterInfoClothesSlot';
import FighterInfoSets from '@/features/fighter_info/FighterInfoSets';
import type { FighterRecord } from '@/types/Fighter';

interface FighterInfoClothesProps {
	id: FighterRecord['ID'];
	clothes: FighterRecord['Parts'];
}

const FighterInfoClothes: React.FC<FighterInfoClothesProps> = ({
	id,
	clothes,
}) => {
	return (
		<div className="cloth--wrapper">
			<FighterInfoSets id={id} />

			<FighterInfoClothesSlot
				className="slot-helmet"
				name="Шлем"
				item={clothes.helmet}
			/>

			<FighterInfoClothesSlot
				className="slot-torso"
				name="Доспех корпуса"
				item={clothes.torso}
			/>

			<FighterInfoClothesSlot
				className="slot-shoulderpads"
				name="Наплечники"
				item={clothes.shoulderpads}
			/>

			<FighterInfoClothesSlot
				className="slot-bracers"
				name="Наручи"
				item={clothes.bracers}
			/>

			<FighterInfoClothesSlot
				className="slot-righthand"
				name="Оружие"
				item={clothes.righthand}
			/>

			<FighterInfoClothesSlot
				className="slot-lefthand"
				name="Оружие / Щит"
				item={clothes.lefthand}
			/>

			<FighterInfoClothesSlot
				className="slot-glowes"
				name="Перчатки"
				item={clothes.glowes}
			/>

			<FighterInfoClothesSlot
				className="slot-cuisses"
				name="Набедренники"
				item={clothes.cuisses}
			/>

			<FighterInfoClothesSlot
				className="slot-jambs"
				name="Наголенники / Поножи"
				item={clothes.jambs}
			/>

			<FighterInfoClothesSlot
				className="slot-boots"
				name="Защита стопы"
				item={clothes.boots}
			/>
		</div>
	);
};

export default FighterInfoClothes;
