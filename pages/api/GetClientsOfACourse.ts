// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from "../../lib/prisma";

type Data = {
    clients?: Array<{}>
    error?: string,
    message?: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if(req.method !== "GET") return res.status(400).json({ error: "Only POST is allowed" })

    if(!req.body.course) {
        return res.status(400).json({
            error: "Please enter all the fields"
        });
    }

    let courseID = 0;

    // Gets the ID of the course
    prisma.courses.findMany({
        where: {
            name: req.body.course
        }
    }).then((courses: any) => {
        if(courses.length !== 1) {
            return res.status(400).json({
                error: "Course not found"
            });
        } else {
            courseID = courses[0].id;
        }
    }).then(() => {
        prisma.clients.findMany({
            where: {
                course: courseID
            },
            orderBy: [
                {
                    name: "asc"
                }
            ]
        }).then((clients: any) => {
            return res.status(200).json({
                clients: clients
            });
        }).catch((error: any) => {            
            return res.status(500).json({
                error: "Something went wrong"
            });
        })
    }).catch((error: any) => {
        return res.status(500).json({
            error: "Something went wrong"
        });
    });
};