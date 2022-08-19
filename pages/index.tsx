import type { NextPage } from 'next'

import Logo from './components/Logo'
import Title from './components/Title'

const Home: NextPage = () => {

	const buttonStyling = "bg-green text-white font-bold text-4xl px-7 py-3 mr-7 mb-7 rounded-md";

	return (
		<div>
			<Logo />
			<div className="flex flex-col items-center justify-center h-450">
				<div className="flex flex-wrap md:flex-none lg:flex-none items-center justify-center">
					<button className={buttonStyling}>Sign In</button>
					<button className={buttonStyling}>Sign Out</button>
				</div>
				<button className={buttonStyling}>Registered</button>
			</div>
		</div>
	)
}

export default Home;
