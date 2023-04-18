export default function Select({ name, options = [] }) {
  return (
    <select
      className='w-full h-12 px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none'
      name={name}
    >
      {options.map((option) => (
        <option key={option?.key}>{option?.description}</option>
      ))}
    </select>
  )
}
