// import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from '@prisma/client';
// import serverAuth from "@/libs/serverAuth";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         if (req.method !== 'GET') {
//         return res.status(405).end();
//         }

//         await serverAuth(req, res);

//         const { flowerId } = req.query;

//         if (typeof flowerId !== 'string') {
//         throw new Error('Invalid Id');
//         }

//         if (!flowerId) {
//         throw new Error('Missing Id');
//         }
//         const prisma = new PrismaClient();
//         const flowers = await prisma.flower.findUnique({
//             where: {
//                 id: flowerId,
//             },
//         });


//         return res.status(200).json(flowers);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).end();
//     }
// }
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
