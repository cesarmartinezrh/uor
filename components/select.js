export default function Select({
  name,
  options = [],
  selectName = '',
  ...props
}) {
  return (
    <select
      className='w-full h-12 px-4 py-1 rounded-r-md border border-gray-300 text-gray-800 focus:outline-none'
      name={name}
      {...props}
    >
      <option value=''>{selectName}</option>
      {options.map((option) => (
        <option key={option?.key} value={option?.description}>
          {option?.description}
        </option>
      ))}
    </select>
  )
}
