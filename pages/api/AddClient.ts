// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from "../../lib/prisma";

type Data = {
  error?: string,
  message?: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const course = req.body.course;
	const name = req.body.name;
	const company = req.body.company;

	// Makes sure all the fields are submitted
	if(!course || !name || !company) {
		res.status(400).json({
			error: "Please enter all the fields"
		});
		return;
	}

	// Checks if the course is a valid course
	prisma.Courses.findMany({
		where: {
			name: course
		}
	}).then((course: any) => {		
		if(course.length !== 1) {
			res.status(400).json({
				error: "Course doesn't exist"
			});
		} else {
			try {
				// If the course is valid, it adds it to the database
				const courseID = course[0].id;
				prisma.Clients.create({
					data: {
						name: name,
						company: company,
						course: courseID
					}
				});

				res.status(200).json({
					message: "Success"
				});
			} catch(e) {
				res.status(500).json({
					error: "Something went wrong"
				});
			}
			
		}
	});
}