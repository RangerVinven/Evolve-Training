import React from 'react'
import { useRouter } from 'next/router'

import Logo from '../components/Logo';
import CourseSelect from '../components/CourseSelect';

import { prisma } from "../../lib/prisma";
import Title from '../components/Title';

export async function getServerSideProps() {
	const courses = await prisma.courses.findMany({orderBy: [{ name: "asc" }]});

	return {
		props: {
			courses
		}
	}
}

export default function Courses(props: any) {

	const router = useRouter();
    const option = router.query.option!.toString();

	
	if(option === "signin" || option === "signout" || option === "registered") {
		return (
			<div>
				<Logo />
				<div className="flex justify-center items-center">
					<CourseSelect courses={props.courses} option={option} />
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<Logo />
				<div className="flex justify-center items-center">
					<Title title="Error: Only 'signin', 'signup' and 'registered' is allowed" showDate={false} />
				</div>
			</div>
		)
	}
}
