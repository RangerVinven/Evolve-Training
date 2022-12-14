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
    
        const clientID = req.body.clientID;
        if(!clientID) return res.status(400).json({ error: "Missing clientID" });

        // Deletes the client
        prisma.clients.delete({
            where: {
                id: clientID
            }
        }).then((result: any) => {
            return res.status(200).json({
                message: "Client deleted"
            });
        }).catch((error: any) => {
            return res.status(500).json({
                error: "Something went wrong"
            });
        });
    });
}