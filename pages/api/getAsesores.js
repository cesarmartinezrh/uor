import asesoresdata from '../../data/general.json'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Solo se permiten solicitudes GET' })
    return
  }

  const filter = req.query ?? {}

  const { estado, rs, ct, nombre, folio, rfn } = filter
  const filteredData = asesoresdata.filter(
    (asesor) =>
      asesor.estado.trim().toLocaleLowerCase() ===
        estado.trim().toLocaleLowerCase() &&
      asesor.rs
        .trim()
        .toLocaleLowerCase()
        .includes(rs?.trim().toLocaleLowerCase()) &&
      asesor.ct
        .trim()
        .toLocaleLowerCase()
        .includes(ct?.trim().toLocaleLowerCase()) &&
      asesor.nombre
        .trim()
        .toLocaleLowerCase()
        .includes(nombre?.trim().toLocaleLowerCase()) &&
      asesor.folio
        .trim()
        .toLocaleLowerCase()
        .includes(folio?.trim().toLocaleLowerCase()) &&
      asesor.estado.trim().toLocaleLowerCase() ===
        estado.trim().toLocaleLowerCase()
  )

  res.status(200).json(filteredData)
}
