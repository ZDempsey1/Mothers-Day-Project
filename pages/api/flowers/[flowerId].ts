import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const flowerId = req.query.flowerId;

    if (req.method === 'GET') {
        try {
        const flower = await prisma.flower.findUnique({
            where: {
            id: String(flowerId),
            },
        });

        if (!flower) {
            return res.status(404).json({ error: 'Flower not found' });
        }

        return res.status(200).json(flower);
        } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the flower data' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
