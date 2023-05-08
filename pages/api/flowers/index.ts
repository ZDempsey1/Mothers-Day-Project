import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
        return res.status(405).end();
        }

        await serverAuth(req, res);

        const prisma = new PrismaClient();
        const flowers = await prisma.flower.findMany();

        return res.status(200).json(flowers);
    } catch (error) {
        console.log({ error })
        return res.status(500).end();
    }
}
