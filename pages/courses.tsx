import React, { useEffect } from 'react'
import Router, { useRouter } from 'next/router'

import Logo from './components/Logo';
import CourseSelect from './components/CourseSelect';

export default function Courses() {

	const router = useRouter();
    const option = router.query.option;
	
	if(option === "signin" || option === "signout" || option === "registered") {
		return (
			<div>
				<Logo />
				<div className="flex justify-center items-center">
					<CourseSelect option={option} />
				</div>
			</div>
		);
	} else {
		useEffect(() => {
			router.push("/");
		}, []);
	}
}
