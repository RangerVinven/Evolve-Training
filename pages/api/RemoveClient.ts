// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readdirSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from "../../lib/prisma";

type Data = {
  error?: string,
  message?: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const clientID = req.body.clientID;

    if(!clientID) res.status(400).json({ error: "Missing clientID" });

    prisma.clients.delete({
        where: {
            id: clientID
        }
    }).then((result) => {
        return res.status(200).json({
            message: "Client deleted"
        });
    }).catch((error) => {
        return res.status(500).json({
            error: "Something went wrong"
        });
    })
}