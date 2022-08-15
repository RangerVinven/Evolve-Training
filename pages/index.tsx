import type { NextPage } from 'next'

import Logo from './components/Logo'
import Title from './components/Title'

const Home: NextPage = () => {

	const paragraphStyling = "text-green text-lg w-8/12 font-bold";

	return (
		<div>
			<Logo />
			<div className="flex flex-col items-center justify-center">
				<Title title="No Course Selected" showDate={false} />
				<p className={paragraphStyling}>
					In order to submit your information to get your certificate,
					you must go to the Evolve Training office and request the QR
					code for your course.
				</p>
				<br />
				<p className={paragraphStyling}>
					Please scan that QR code - or go to the URL below it - and fill
					out your information in order to get your certificate.
				</p>
			</div>
		</div>
	)
}

export default Home;
