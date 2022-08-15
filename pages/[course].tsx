import type { NextPage } from 'next'
import { useRouter } from 'next/router';

import { prisma } from "../lib/prisma";

import Logo from './components/Logo'
import Form from './components/Form'
import CourseNotFound from './components/CourseNotFound';

type Course = {
	id: number,
	name: string
}

export async function getServerSideProps() {
    const courses = await prisma.Courses.findMany();

    return {
		props: {
			courses: courses
		}
	};
};

const Home: NextPage = (courses: any) => {
	const router = useRouter();
	const courseEntered = (router.query).course!.toString();

	// Checks whether the course exists
	let isACourse = false;
	courses.courses.forEach((course: Course) => {
		if(course.name === courseEntered) {
			isACourse = true;			
		}
	});
	
	return (
		<div>
			<Logo />
			<div className="flex items-center justify-center">
				{
					isACourse ? <Form course={courseEntered} /> : <CourseNotFound />
				}
			</div>
		</div>
	)
}

export default Home
