import type { FighterRecord } from '@/types/Fighter';

export const calcEff = (fighter: FighterRecord) => {
	const {
		Sword,
		MorningStar,
		PoleArm,
		Bastard,
		Wrestling,
		Shield,

		Strength,
		Dexterity,
		Stamina,

		Luck,
		Talent,

		Weight,
		Height,
	} = fighter;

	if (!Luck) {
		return 0;
	}

	console.log(
		Sword,
		MorningStar,
		PoleArm,
		Bastard,
		Wrestling,
		Shield,
		Strength,
		Dexterity,
		Stamina,
		Luck,
		Talent,
		Weight,
		Height,
	);

	let effMod =
		(Sword + MorningStar + PoleArm + Bastard + Wrestling + Shield) / 6;

	console.log(effMod);

	// # Мечник
	if (Sword > MorningStar && Sword > PoleArm && Sword > Bastard) {
		console.log('sword');
		effMod = (Sword + Shield + Wrestling) / 2.6;
	}
	// # Бастардщик
	if (Bastard > MorningStar && Bastard > PoleArm && Bastard > Sword) {
		console.log('bastard');
		effMod = (Bastard + Wrestling) / 2;
	}
	// # Дробитель
	if (MorningStar > Sword && MorningStar > PoleArm && MorningStar > Bastard) {
		console.log('mace');
		effMod = (MorningStar + Shield + Wrestling) / 2.6;
	}
	// # Алебардист
	if (PoleArm > MorningStar && PoleArm > Sword && PoleArm > Bastard) {
		console.log('pole');
		effMod = (PoleArm + Wrestling) / 2;
	}
	console.log(effMod);

	const effectiveness =
		(Strength +
			Dexterity +
			Stamina +
			Luck * 1.5 +
			Talent * 10 +
			effMod * 3.5 +
			(Weight + Height) / 100) /
		10;

	// return effectiveness
	return effectiveness.toFixed(2);

	/*
  *
  * public static function Effectiveness($id)  {
        if (is_array($id))    {
            $fighter=$id;
        }
        else {
            # $Get=new Get();
            # $fighter=Get::Fighter($id);
            $Db = new Db();
            // $fighter=$Db->Once("SELECT * FROM `fighters` WHERE `id`='{$id}';");
            $fighter = $Db->getFighterByID($id);
        }
        # Старая эффективность (по всем параметрам)
        // $oldeffectiveness=$fighter['strength']+$fighter['dextirity']+$fighter['stamina']+($fighter['luck']*1.5)+($fighter['talant']*10)+$fighter['sword']+$fighter['shield']+$fighter['morningstar']+$fighter['bastard']+$fighter['polyarm']+$fighter['wrestling']+(($fighter['weight']+$fighter['height'])/100);
        # Себе на тесты ------------------------------------
        #if ($_SESSION['id']=='1')   {
            $sword = (int)($fighter['sword'] ?? 1);
            // var_dump($sword);
            $morningstar = (int)($fighter['morningstar'] ?? 1);
            $polyarm = (int)($fighter['polyarm'] ?? 1);
            $bastard = (int)($fighter['bastard'] ?? 1);
            $wrestling = (int)($fighter['wrestling'] ?? 1);
            $shield = (int)($fighter['shield'] ?? 1);

            $strength = (int)($fighter['strength'] ?? 1);
            $dextirity = (int)($fighter['dextirity'] ?? 1);
            $stamina = (int)($fighter['stamina'] ?? 1);

            $luck = (int)($fighter['luck'] ?? 1);
            $talant = (float)($fighter['talant'] ?? 1);

            $weight = (float)($fighter['weight'] ?? 1);
            $height = (float)($fighter['height']?? 1);

            $effmod=($sword + $morningstar + $polyarm + $bastard + $wrestling + $shield) / 6;

            # Мечник
            if ($sword>$morningstar and $sword>$polyarm and $sword>$bastard)  {
                $effmod=($sword+$shield+$wrestling)/2.6;
            }
            # Бастардщик
            if ($bastard>$morningstar and $bastard>$polyarm and $bastard>$sword)  {
                $effmod=($bastard+$wrestling)/2;
            }
            # Дробитель
            if ($morningstar>$sword and $morningstar>$polyarm and $morningstar>$bastard)  {
                $effmod=($morningstar+$shield+$wrestling)/2.6;
            }
            # Алебардист
            if ($polyarm>$morningstar and $polyarm>$sword and $polyarm>$bastard)  {
                $effmod=($polyarm+$wrestling)/2;
            }
            $effectiveness= $strength + $dextirity + $stamina +($luck*1.5) + ($talant *10) + ($effmod*3.5) +(($weight + $height)/100);
        #}
        # --------------------------------------------------
        return (float)sprintf("%01.2f",round($effectiveness/10,2));
        #return sprintf("%01.2f",round($effectiveness/10,2)).' ('.sprintf("%01.2f",round($oldeffectiveness/10,2)).')';

    }
  * */
};
