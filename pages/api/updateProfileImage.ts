import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userId, imageUrl } = req.body;

        if (!userId || !imageUrl) {
        res.status(400).json({ error: 'User ID and image URL are required.' });
        return;
        }

        try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { profileImage: imageUrl },
        });

        res.status(200).json({ user: updatedUser });
        } catch (error) {
        res.status(500).json({ error: 'Failed to update profile image.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}
