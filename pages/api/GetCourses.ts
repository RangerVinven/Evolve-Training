// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from "../../lib/prisma";

type Data = {
    courses?: Array<{}>
    error?: string,
    message?: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	prisma.courses.findMany({}).then((courses: any) => {
        res.status(200).json({
            courses: courses
        });
        res.end();
    }).catch((error: any) => {
        res.status(500).json({
            error: "Something went wrong"
        });
        res.end();
    })
};