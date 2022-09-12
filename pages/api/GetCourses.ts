// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from "../../lib/prisma";

type Data = {
    courses?: Array<{}>
    error?: string,
    message?: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if(req.method !== "GET") return res.status(405).json({ error: "Only GET is allowed" })

    return new Promise((resolve: any, reject: any) => {
        prisma.courses.findMany({
            orderBy: [
                {
                    name: "asc"
                }
            ]
        }).then((courses: any) => {
            return res.status(200).json({
                courses: courses
            });
        }).catch((error: any) => {
            return res.status(500).json({
                error: "Something went wrong"
            });
        })
    });
};