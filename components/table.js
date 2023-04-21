export default function Table({ data = [] }) {
  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto sm:mx-0.5 lg:mx-1.5'>
        <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full'>
              <thead className='bg-white border-b'>
                <tr>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                  >
                    Estado
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                  >
                    Folio Asesor
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                  >
                    Representante Legal
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                  >
                    Asesor Técnico
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                  >
                    Tipo de persona
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                  >
                    Capacidad Técnica
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                  >
                    Teléfono y Correo Electrónico
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                  >
                    RFN
                  </th>
                  <th
                    scope='col'
                    className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                  >
                    Persona Evaluada
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((asesor) => (
                  <tr
                    key={asesor.id}
                    className='bg-gray-100 border-b even:bg-slate-50'
                  >
                    <td className='px-6 py-4  text-sm font-medium text-gray-900'>
                      {asesor.estado}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 '>
                      {asesor.folio}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 '>
                      {asesor.nombre}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 '>
                      {asesor.rs}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 '>
                      {asesor.tpd}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 '>
                      {asesor.ct}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 '>
                      {asesor.telcor}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 '>
                      {asesor.rfn}
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 '>
                      {asesor.perval}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
