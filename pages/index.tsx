import type { NextPage } from 'next'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'

import Logo from './components/Logo'
import Title from './components/Title'

const Home: NextPage = () => {	

	const router = useRouter();
	const buttonStyling = "bg-green text-white font-bold text-4xl px-7 py-3 mr-7 mb-7 rounded-md";

	const redirectUser = (router: NextRouter, option: string) => {
		router.push(`/courses/${option}`);
	}

	return (
		<div>
			<Logo />
			<div className="flex flex-col items-center justify-center h-450">
				<div className="flex flex-wrap md:flex-none lg:flex-none items-center justify-center">
					<Link href={{
						pathname: '/courses',
						query: {
							option: 'signin'
						}
					}}>
						<button className={buttonStyling}>Sign In</button>
					</Link>
					
					<button className={buttonStyling} onClick={() => redirectUser(router, "signout")}>Sign Out</button>
				</div>
				<button className={buttonStyling} onClick={() => redirectUser(router, "registered")}>Registered</button>
			</div>
		</div>
	)
}

export default Home;
