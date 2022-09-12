// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from "../../lib/prisma";

type Data = {
  courses?: {}[],
  error?: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // Finds and returns the courses beginning with whatever the user entered
    return new Promise((resolve: any, reject: any) => {

        const course = req.body.course;
    
        if(req.method !== "POST") return res.status(405).json({ error: "Only POST is allowed" });

        prisma.courses.findMany({
            where: {
                name: {
                    startsWith: course
                }
            }
        }).then((courses: any) => {
            return res.status(200).json({
                courses: courses
            });
        }).catch((err: any) => {
            return res.status(500).json({
                error: "Something Went Wrong"
            });
        });
    });
}
