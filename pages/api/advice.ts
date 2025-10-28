/**
 * API Route for CSR Component
 * 
 * This endpoint provides advice data for client-side rendering
 * Used by DailyAdviceCSR component via fetch() in useEffect
 * Returns random advice on each request
 */
import { NextApiRequest, NextApiResponse } from 'next'

const adviceList = [
  "You hereby have permission to stop worrying about your checklist—doing the laundry, pumping, buying diapers—and learn to be present with your baby. Enjoy your precious moments together 😊",
  "Expect odd food habits. Offer a variety. Don't push, don't panic. They'll eat when they're hungry 👍",
  "Children are not things to be molded, but people to be unfolded.",
  "The most precious jewels you'll ever have around your neck are the arms of your children.",
  "Kids need your time more than your money."
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return random advice for CSR components
    const randomAdvice = adviceList
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
    
    res.status(200).json({ advice: randomAdvice })
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
