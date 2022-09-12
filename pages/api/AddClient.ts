// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from "../../lib/prisma";

type Data = {
  error?: string,
  message?: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

	return new Promise((resolve: any, reject: any) => {
		if(req.method !== "POST") return res.status(405).json({ error: "Only POST is allowed" })

		const course = req.body.course;
		const name = req.body.name;
		const company = req.body.company;

		// Makes sure all the fields are submitted
		if(!course || !name || !company) {
			return res.status(400).json({
				error: "Please enter all the fields"
			});
		}

		// Checks if the course is a valid course
		prisma.courses.findMany({
			where: {
				name: course
			}
		}).then((course: any) => {		
			if(course.length !== 1) {
				return res.status(400).json({
					error: "Course doesn't exist"
				});
			} else {
				// If the course is valid, it adds it to the database
				const courseID = course[0].id;
				prisma.clients.create({
					data: {
						name: name,
						company: company,
						course: courseID,
					}
				}).then((course: any) => {
					return res.status(200).json({
						message: "Success"
					});
				}).catch((error: any) => {
					return res.status(500).json({
						error: "Something went wrong"
					});
				});	
			}
		});
    });
}