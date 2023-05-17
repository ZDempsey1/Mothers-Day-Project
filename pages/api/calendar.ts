import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { google } from 'googleapis'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check the request method
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    // Check if the user is authenticated
    const session = await getSession({ req })
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        // Load the service account key
        const serviceAccountKey = process.env.API_KEY

        // Authenticate with the Google Cloud service account
        const auth = new google.auth.GoogleAuth({
        credentials: serviceAccountKey,
        scopes: ['https://www.googleapis.com/auth/calendar'],
        })
        const authClient = await auth.getClient()

        // Create a Google Calendar instance
        const calendar = google.calendar({ version: 'v3', auth: authClient })

        // Call the Google Calendar API
        const calendarId = 'primary' // Use the primary calendar
        const result = await calendar.events.list({
        calendarId,
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
        })

        // Send the result as the response
        res.json(result.data)
    } catch (error) {
        // Send an error response
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
}
