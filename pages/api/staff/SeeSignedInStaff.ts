// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from "../../../lib/prisma";

type Response = {
    staff?: Array<{}>,
    error?: String
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    return new Promise((resolve: any, reject: any) => {
        if(req.method !== "GET") return res.status(405).json({ error: "Only GET is allowed" });

        // Returns all the staff
        prisma.staff.findMany({
            orderBy: {
                Name: "asc"
            },
            where: {
                SignedIn: true
            }
        }).then((staff: Array<{}>) => {            
            return res.status(200).json({
                staff: staff
            });
        }).catch((error: any) => {
            return res.status(500).json({
                error: "Something went wrong"
            });
        });
        
    });
}
