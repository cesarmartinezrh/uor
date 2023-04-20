export default function TextInput({ placeholder }) {
  return (
    <input
      type='search'
      className='w-full h-12 px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none'
      placeholder={placeholder}
    />
  )
}
