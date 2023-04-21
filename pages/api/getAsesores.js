import { useState } from 'react'
import asesoresdata from '../../data/general.json'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Solo se permiten solicitudes GET' })
    return
  }

  try {
    const filter = req.query ?? {}
    const filteredData = await asesoresdata.filter((asesor) => {
      return Object.keys(filter).every((key) => {
        return asesor[key]
          .trim()
          .toLocaleLowerCase()
          .includes(filter[key].trim().toLocaleLowerCase())
      })
    })

    res.status(200).json(filteredData)
  } catch (err) {
    res.status(400).json({ error: 'Consulta no válida' })
  }
}
