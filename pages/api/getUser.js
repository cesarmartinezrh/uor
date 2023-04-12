import axios from 'axios'

export default function getUser(req, res) {
  const data = req.body
  console.log(data)
  const URL = process.env.USERS_API
  console.log(URL)
}
