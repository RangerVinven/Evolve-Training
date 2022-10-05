import type { NextPage } from 'next'
import Link from 'next/link'
import { NextRouter } from 'next/router'

import Logo from './components/Logo'

const Home: NextPage = () => {	

	// const buttonStyling = "bg-green text-white font-bold text-4xl px-7 py-3 mr-7 mb-7 rounded-md";
	const buttonStyling = "bg-green text-white font-bold text-4xl px-14 py-6 mr-7 mb-7 rounded-md";

	const redirectUser = (router: NextRouter, option: string) => {
		router.push(`/courses/${option}`);
	}

	return (
		<div>
			<Logo />
			<div className="m-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<div className="flex flex-col">
					<div className="flex flex-wrap flex-none lg:flex-none items-center justify-center">
						<Link href={{
							pathname: '/courses',
							query: {
								option: 'signin'
							}
						}}>
							<button className={buttonStyling}>Sign In</button>
						</Link>
						
						<Link href={{
							pathname: '/courses',
							query: {
								option: 'signout'
							}
						}}>
							<button className={buttonStyling}>Sign Out</button>
						</Link>
					</div>
					<Link href={{
							pathname: '/courses',
							query: {
								option: 'registered'
							}
						}}>
						<button className="bg-green text-white font-bold text-2xl px-2 py-2 mr-7 mt-10 rounded-md">Registered</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Home;
