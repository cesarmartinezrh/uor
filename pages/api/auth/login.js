import axios from 'axios'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  } else {
  }
  try {
    const loginInfo = JSON.parse(JSON.stringify(req.body))
    const response = await axios.post(
      'http://187.218.23.71/API_REST/api/autorizacion',
      loginInfo,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    const { data: user } = await response

    if (!user) {
      res.status(404).send({ message: 'User does not exist!' })
      return
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(405).send({ message: `${error.message}` })
    return
  }
}

export default handler
