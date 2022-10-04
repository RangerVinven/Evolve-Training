// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from "../../../lib/prisma";

type Response = {
    message?: string,
    error?: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {

    // Makes sure only POST is used, the entire body is given and that it's in the right format
    if(req.method !== "POST") return res.status(405).json({ error: "Only POST is allowed" })
    if (req.body.name === undefined || req.body.name === null || req.body.option === undefined || req.body.option === null) return res.status(400).json({ error: "Missing neccessary body variable(s)" })
    if (req.body.option !== true && req.body.option !== false) return res.status(400).json({ error: "Option must only be true or false" })

    return new Promise((resolve: any, reject: any) => {
        // Finds and updates the staff's signed in status
        prisma.staff.update({
            where: {
                Name: req.body.name
            },
            data: {
                SignedIn: req.body.option
            }
        }).then((response: any) => {            
            return res.status(200).json({
                message: "Success"
            });
        }).catch((error: any) => {
            return res.status(500).json({
                error: "Something went wrong"
            });
        })

    });
};