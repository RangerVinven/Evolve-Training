import type { NextPage } from 'next'

import Logo from './components/Logo'
import Form from './components/Form'

const Home: NextPage = () => {
	return (
		<div>
			<Logo />
			<div className="flex items-center justify-center">
				<Form />
			</div>
		</div>
	)
}

export default Home
