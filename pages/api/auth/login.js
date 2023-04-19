import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' })
  }

  try {
    const response = await axios.post(
      'http://187.218.23.71/API_REST/api/autorizacion',
      req.body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    const { data: user } = response

    if (!user) {
      return res.status(404).json({ message: 'User does not exist!' })
    }

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: `${error.message}` })
  }
}
