import Link from 'next/link';
import React from 'react'
import Logo from '../components/Logo'
import Title from '../components/Title';

export default function index() {

	return (
		<div>
			<div className="absolute">
				<Logo />
			</div>

			<Title title="Staff" showBackButton={true} showDate={false} />

			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col">
				<div className="mb-10">
					<Link href={{
							pathname: "/staff/signinorout"
						}}>
							<button className="bg-green text-white font-bold text-4xl px-14 py-6 mr-7 mb-7 rounded-md">
								Sign In/Out
							</button>
					</Link>
				</div>

				<button className="bg-green text-white font-bold text-2xl px-2 py-2 mr-7 mb-7 rounded-md">
					Signed In
				</button>
			</div>
		</div>
	)
}