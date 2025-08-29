// MastersSets.tsx

import Image from 'next/image';
import type React from 'react';
import { BuyArmorComplect } from '@/features/eng_old/BuyArmorComplect';

/*

			dangerouslySetInnerHTML={{
				__html: `<img src="${src}" alt="${alt}" style="display: inline; margin: 0 2px; vertical-align: middle;">`,
			}}

*/

// Helper component to render HTML inside title attributes safely
const TooltipImage: React.FC<{
	src: string;
	title: string;
	alt?: string;
}> = ({ src, title, alt = 'item' }) => {
	return (
		<span title={title} style={{ cursor: 'pointer', display: 'inline-block' }}>
			<Image
				src={src}
				alt={alt}
				style={{
					display: 'inline',
					margin: '0 2px',
					verticalAlign: 'middle',
				}}
			/>
		</span>
	);
};

// Raw tooltip content (cleaned and readable)
const SET_TOOLTIPS = {
	gambeson: `<b>Гамбезон с рукавами и набедренниками</b><br>Защита: 35%<br>Прочность: 110/110<br>Вес: 2.92 кг<br>Аутентичность: 5<br>Внешний вид: 4`,
	spangenhelm: `<b>Каркасный шлем</b><br>Защита: 30%<br>Прочность: 70/70<br>Вес: 2.04 кг<br>Аутентичность: 5<br>Внешний вид: 2`,
	splintjambs: `<b>Шинные поножи</b><br>Защита: 55%<br>Прочность: 50/50<br>Вес: 0.78 кг<br>Аутентичность: 3<br>Внешний вид: 0`,
	glovesrondel: `<b>Перчатки с ронделем</b><br>Защита: 45%<br>Прочность: 80/80<br>Вес: 0.58 кг<br>Аутентичность: 2<br>Внешний вид: 1`,
	highboots: `<b>Кожаные сапоги</b><br>Защита: 35%<br>Прочность: 80/80<br>Вес: 1.36 кг<br>Аутентичность: 2<br>Внешний вид: 4`,

	owl: `<b>Сова</b><br>Защита: 45%<br>Прочность: 150/150<br>Вес: 1.75 кг<br>Аутентичность: 5<br>Внешний вид: 5`,
	chainmail: `<b>Длинная кольчуга</b><br>Защита: 55%<br>Прочность: 100/100<br>Вес: 11.39 кг<br>Аутентичность: 7<br>Внешний вид: 5`,
	gloves: `<b>Кожаные перчатки</b><br>Защита: 35%<br>Прочность: 80/80<br>Вес: 0.38 кг<br>Аутентичность: 1<br>Внешний вид: 1`,
	normanjambs: `<b>Норманнские шинные поножи</b><br>Защита: 60%<br>Прочность: 60/60<br>Вес: 1.09 кг<br>Аутентичность: 3<br>Внешний вид: 0`,
	normanboots: `<b>Норманнские башмаки</b><br>Защита: 25%<br>Прочность: 80/80<br>Вес: 0.90 кг<br>Аутентичность: 5<br>Внешний вид: 1`,

	coif: `<b>Койф</b><br>Защита: 38%<br>Прочность: 80/80<br>Вес: 1.68 кг<br>Аутентичность: 5<br>Внешний вид: 5`,
	mailgambeson: `<b>Гамбезон со вставками</b><br>Защита: 43%<br>Прочность: 100/100<br>Вес: 3.96 кг<br>Аутентичность: 2<br>Внешний вид: 4`,
	romanvambraces: `<b>Римские наручи</b><br>Защита: 50%<br>Прочность: 40/40<br>Вес: 0.92 кг<br>Аутентичность: 1<br>Внешний вид: 7`,

	// todo - add tooltip
	romanjambs: ``,

	mailgloves: `<b>Кольчужные перчатки</b><br>Защита: 60%<br>Прочность: 80/80<br>Вес: 1.25 кг<br>Аутентичность: 2<br>Внешний вид: 4`,
	mailchausses: `<b>Кольчужные шоссы</b><br>Защита: 50%<br>Прочность: 80/80<br>Вес: 3.52 кг<br>Аутентичность: 8<br>Внешний вид: 6`,
	riderboots: `<b>Сапоги наездника</b><br>Защита: 45%<br>Прочность: 90/90<br>Вес: 1.54 кг<br>Аутентичность: 5<br>Внешний вид: 5`,

	hamata: `<b>Lorica hamata</b><br>Защита: 50%<br>Прочность: 80/80<br>Вес: 11.72 кг<br>Аутентичность: 5<br>Внешний вид: 5`,
	barbute: `<b>Барбют</b><br>Защита: 60%<br>Прочность: 150/150<br>Вес: 2.70 кг<br>Аутентичность: 3<br>Внешний вид: 2`,

	sallet: `<b>Салад</b><br>Защита: 70%<br>Прочность: 120/120<br>Вес: 2.35 кг<br>Аутентичность: 6<br>Внешний вид: 5`,
	pikemancuirass: `<b>Комплект пикенёра</b><br>Защита: 78%<br>Прочность: 90/90<br>Вес: 9.10 кг<br>Аутентичность: 3<br>Внешний вид: 3`,
	gardbracespaulders: `<b>Малые наплечники с гардбрейсом</b><br>Защита: 70%<br>Прочность: 90/90<br>Вес: 1.22 кг<br>Аутентичность: 1<br>Внешний вид: 6`,
	improvedbracers: `<b>Усиленные наручи</b><br>Защита: 75%<br>Прочность: 90/90<br>Вес: 1.14 кг<br>Аутентичность: 3<br>Внешний вид: 6`,
	improvedjambs: `<b>Улучшенные поножи</b><br>Защита: 74%<br>Прочность: 90/90<br>Вес: 1.56 кг<br>Аутентичность: 3<br>Внешний вид: 6`,
	sabatons: `<b>Сабатоны (XIV в.)</b><br>Защита: 75%<br>Прочность: 80/80<br>Вес: 1.26 кг<br>Аутентичность: 7<br>Внешний вид: 7`,
	demiguantlets: `<b>Полуперчатки «Песочные часы»</b><br>Защита: 65%<br>Прочность: 120/120<br>Вес: 1.60 кг<br>Аутентичность: 5<br>Внешний вид: 3`,

	closedhelm: `<b>Закрытый шлем</b><br>Защита: 95%<br>Прочность: 180/180<br>Вес: 3.60 кг<br>Аутентичность: 7<br>Внешний вид: 7`,
	cuirass16: `<b>Кираса (XVI в.)</b><br>Защита: 93%<br>Прочность: 100/100<br>Вес: 8.75 кг<br>Аутентичность: 5<br>Внешний вид: 5`,
	guantlets16: `<b>Латные перчатки (XVI в.)</b><br>Защита: 95%<br>Прочность: 90/90<br>Вес: 2.20 кг<br>Аутентичность: 7<br>Внешний вид: 9`,
	fullhand2: `<b>Парадные латные руки</b><br>Защита: 85%<br>Прочность: 80/80<br>Вес: 3.18 кг<br>Аутентичность: 7<br>Внешний вид: 9`,
	maxlegs: `<b>Максимилиановские латные ноги</b><br>Защита: 90%<br>Прочность: 90/90<br>Вес: 6.98 кг<br>Аутентичность: 7<br>Внешний вид: 7`,
	milansabatons: `<b>Миланские сабатоны</b><br>Защита: 80%<br>Прочность: 80/80<br>Вес: 1.31 кг<br>Аутентичность: 7<br>Внешний вид: 9`,
};

const MastersSets: React.FC = () => {
	return (
		<div
			data-id="complectslist"
			style={{
				minHeight: '200px',
				display: 'none',
			}}
		>
			{/* Легкий комплект */}
			<b className="highlight">Легкий комплект</b>
			<br />
			Защита: ~40.00%
			<br />
			Вес: ~7.68кг.
			<br />
			Цена: ~$120.90
			<br />
			Хороший комплект для начинающих. Чреват травмами, но стоит недорого и вряд
			ли перегрузит вашего бойца. Ибо он весит... Да ничего, считай, не весит!
			<br />
			<TooltipImage
				src="/img/things/gambesonplus.png"
				title={SET_TOOLTIPS.gambeson}
			/>
			<TooltipImage
				src="/img/things/spangenhelm.png"
				title={SET_TOOLTIPS.spangenhelm}
			/>
			<TooltipImage
				src="/img/things/splintjambs.png"
				title={SET_TOOLTIPS.splintjambs}
			/>
			<TooltipImage
				src="/img/things/glovesrondel.png"
				title={SET_TOOLTIPS.glovesrondel}
			/>
			<TooltipImage
				src="/img/things/highboots.png"
				title={SET_TOOLTIPS.highboots}
			/>
			<br />
			<input
				type="button"
				className="training"
				value="Купить комплект"
				onClick={() => BuyArmorComplect?.('1')}
			/>
			<hr />
			{/* Норманнский комплект */}
			<b className="highlight">Норманнский комплект</b>
			<br />
			Защита: ~44.00%
			<br />
			Вес: ~15.51кг.
			<br />
			Цена: ~$250.50
			<br />
			Хочешь быть викингом - будь им на свой страх и риск. К тому же,
			практически исторично (но это не точно!)
			<br />
			<TooltipImage src="/img/things/owl.png" title={SET_TOOLTIPS.owl} />
			<TooltipImage
				src="/img/things/chainmail.png"
				title={SET_TOOLTIPS.chainmail}
			/>
			<TooltipImage src="/img/things/gloves.png" title={SET_TOOLTIPS.gloves} />
			<TooltipImage
				src="/img/things/normanjambs.png"
				title={SET_TOOLTIPS.normanjambs}
			/>
			<TooltipImage
				src="/img/things/normanboots.png"
				title={SET_TOOLTIPS.normanboots}
			/>
			<br />
			<input
				type="button"
				className="training"
				value="Купить комплект"
				onClick={() => BuyArmorComplect?.('2')}
			/>
			<hr />
			{/* Легкая прогулка */}
			<b className="highlight">Легкая прогулка</b>
			<br />
			Защита: ~47.67%
			<br />
			Вес: ~12.87кг.
			<br />
			Цена: ~$224.75
			<br />
			Выходя в город прогуляться, хочешь быть защищенным, но не знаешь как? Не
			хватает денег? Боец дохловат? Тогда это твой выбор!
			<br />
			<TooltipImage src="/img/things/coif.png" title={SET_TOOLTIPS.coif} />
			<TooltipImage
				src="/img/things/mailgambeson.png"
				title={SET_TOOLTIPS.mailgambeson}
			/>
			<TooltipImage
				src="/img/things/romanvambraces.png"
				title={SET_TOOLTIPS.romanvambraces}
			/>
			<TooltipImage
				src="/img/things/mailgloves.png"
				title={SET_TOOLTIPS.mailgloves}
			/>
			<TooltipImage
				src="/img/things/mailchausses.png"
				title={SET_TOOLTIPS.mailchausses}
			/>
			<TooltipImage
				src="/img/things/riderboots.png"
				title={SET_TOOLTIPS.riderboots}
			/>
			<br />
			<input
				type="button"
				className="training"
				value="Купить комплект"
				onClick={() => BuyArmorComplect?.('3')}
			/>
			<hr />
			{/* Почти римлянин */}
			<b className="highlight">Почти римлянин</b>
			<br />
			Защита: ~50.00%
			<br />
			Вес: ~18.82кг.
			<br />
			Цена: ~$365.25
			<br />
			Хочешь быть стильным модником, не отступающим от традиций Империи? Это
			вряд ли, но кое-что мы можем тебе предложить!
			<br />
			<TooltipImage src="/img/things/hamata.png" title={SET_TOOLTIPS.hamata} />
			<TooltipImage
				src="/img/things/romanvambraces.png"
				title={SET_TOOLTIPS.romanvambraces}
			/>
			<TooltipImage
				src="/img/things/romanjambs.png"
				title={SET_TOOLTIPS.romanjambs}
			/>
			<TooltipImage
				src="/img/things/barbute.png"
				title={SET_TOOLTIPS.barbute}
			/>
			<TooltipImage
				src="/img/things/riderboots.png"
				title={SET_TOOLTIPS.riderboots}
			/>
			<TooltipImage
				src="/img/things/glovesrondel.png"
				title={SET_TOOLTIPS.glovesrondel}
			/>
			<br />
			<input
				type="button"
				className="training"
				value="Купить комплект"
				onClick={() => BuyArmorComplect?.('4')}
			/>
			<hr />
			{/* Рабочая лошадка */}
			<b className="highlight">Рабочая лошадка</b>
			<br />
			Защита: ~72.43%
			<br />
			Вес: ~18.23кг.
			<br />
			Цена: ~$1060.00
			<br />
			Думаешь, все сражались в виде рыцарей в блистающих доспехах? Их ведь еще
			купить надо, а после этого поднять. Но не беда, есть комплект и под боевые
			задачи, без лишнего пафоса.
			<br />
			<TooltipImage src="/img/things/sallet.png" title={SET_TOOLTIPS.sallet} />
			<TooltipImage
				src="/img/things/pikemancuirass.png"
				title={SET_TOOLTIPS.pikemancuirass}
			/>
			<TooltipImage
				src="/img/things/gardbracespaulders.png"
				title={SET_TOOLTIPS.gardbracespaulders}
			/>
			<TooltipImage
				src="/img/things/improvedbracers.png"
				title={SET_TOOLTIPS.improvedbracers}
			/>
			<TooltipImage
				src="/img/things/improvedjambs.png"
				title={SET_TOOLTIPS.improvedjambs}
			/>
			<TooltipImage
				src="/img/things/sabatons.png"
				title={SET_TOOLTIPS.sabatons}
			/>
			<TooltipImage
				src="/img/things/demiguantlets.png"
				title={SET_TOOLTIPS.demiguantlets}
			/>
			<br />
			<input
				type="button"
				className="training"
				value="Купить комплект"
				onClick={() => BuyArmorComplect?.('5')}
			/>
			<hr />
			{/* Максимальная защита */}
			<b className="highlight">Максимальная защита</b>
			<br />
			Защита: ~89.67%
			<br />
			Вес: ~26.02кг.
			<br />
			Цена: ~$2089.99
			<br />
			Думаешь, кто-то полезет с тобой драться? Да на тебя посмотреть-то уже
			страшно. Ты - наглядное воплощение технологий и кузнечного мастерства
			средневековья!
			<br />
			<TooltipImage
				src="/img/things/closedhelm.png"
				title={SET_TOOLTIPS.closedhelm}
			/>
			<TooltipImage
				src="/img/things/cuirass16.png"
				title={SET_TOOLTIPS.cuirass16}
			/>
			<TooltipImage
				src="/img/things/guantlets16.png"
				title={SET_TOOLTIPS.guantlets16}
			/>
			<TooltipImage
				src="/img/things/fullhand2.png"
				title={SET_TOOLTIPS.fullhand2}
			/>
			<TooltipImage
				src="/img/things/maxlegs.png"
				title={SET_TOOLTIPS.maxlegs}
			/>
			<TooltipImage
				src="/img/things/milansabatons.png"
				title={SET_TOOLTIPS.milansabatons}
			/>
			<br />
			<input
				type="button"
				className="training"
				value="Купить комплект"
				onClick={() => BuyArmorComplect?.('6')}
			/>
			<hr />
		</div>
	);
};

export default MastersSets;
