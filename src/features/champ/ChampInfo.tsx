// ChampInfo.tsx
import type React from 'react';
import './ChampInfo.css';

const ChampInfo: React.FC = () => {
	// You can later enhance this with:
	// - useState to track championship state
	// - useEffect to start a client-side timer
	// - API call to get season start/end times

	return (
		<section className="champ-info--wrapper">
			{/* Optional: Timer Placeholder */}
			{/*
      <div style={{ textAlign: 'center' }}>
        <span>
          До конца чемпионата:<br />
          <span className="largetimer">02:14:56:23</span>
        </span>
      </div>
      <hr />
      */}

			{/* League Categories Grid */}
			<div>
				<div className="indexhdrs">
					Шит-меч
					<br />
					(Высшая лига)
				</div>
				<div className="indexhdrs">
					Щит-дробящее
					<br />
					(Высшая лига)
				</div>
				<div className="league_shsw_0 indextbls">&nbsp;</div>
				<div className="league_shmg_0 indextbls">&nbsp;</div>
			</div>

			<div>
				<div className="indexhdrs">
					Бастард
					<br />
					(Высшая лига)
				</div>
				<div className="indexhdrs">
					Древковое
					<br />
					(Высшая лига)
				</div>
				<div className="league_bstrd_0 indextbls">&nbsp;</div>
				<div className="league_plrm_0 indextbls">&nbsp;</div>
			</div>

			<div>
				<div className="indexhdrs">
					1 х 1<br />
					(Высшая лига)
				</div>
				<div className="indexhdrs">
					5 х 5<br />
					(Высшая лига)
				</div>
				<div className="league_1x1_0 indextbls">&nbsp;</div>
				<div className="league_5x5_0 indextbls">&nbsp;</div>
			</div>

			<div>
				<div className="indexhdrs">
					12 х 12
					<br />
					(Высшая лига)
				</div>
				<div className="indexhdrs">
					21 х 21
					<br />
					(Высшая лига)
				</div>
				<div className="league_12x12_0 indextbls">&nbsp;</div>
				<div className="league_21x21_0 indextbls">&nbsp;</div>
			</div>
		</section>
	);
};

export default ChampInfo;

/*
* const [timeLeft, setTimeLeft] = React.useState<string>('');

React.useEffect(() => {
  const target: Date = new Date(); // Replace with actual end/start time from API
  target.setDate(target.getDate() + 2);
  target.setHours(14, 30, 0);

  const timer = setInterval(() => {
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      clearInterval(timer);
      setTimeLeft('Чемпионат начался!');
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    setTimeLeft(`${days}д ${hours}ч ${mins}м ${secs}с`);
  }, 1000);

  return () => clearInterval(timer);
}, []);
*
* <div style={{ textAlign: 'center', margin: '10px 0' }}>
  <span>
    До конца чемпионата:<br />
    <span className="largetimer">{timeLeft}</span>
  </span>
</div>
<hr />
*  */
