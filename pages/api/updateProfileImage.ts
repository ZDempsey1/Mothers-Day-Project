import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import { UserUpdateInput } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const session = await getSession({ req });

        if (!session) {
        return res.status(401).json({ message: 'Not authenticated' });
        }

        const { email, selectedImage } = req.body;

        if (!email || !selectedImage) {
        return res.status(400).json({ message: 'Invalid request data' });
        }

        await prisma.user.update({
        where: { email },
        data: { profileImage: selectedImage,
        } as UserUpdateInput,
        });

        res.status(200).json({ message: 'Profile image updated' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default handler;
