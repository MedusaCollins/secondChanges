import React from 'react'

const ProductSelect = (props) => {
  return (
    <div>
      <label htmlFor={props.name} className="block text-sm font-medium leading-6 text-gray-900  dark:text-gray-400">{props.name}</label>
      <div className="mt-2">
        <select id={props.name} name={props.name} value={props.value} onChange={props.onChange} className="w-full px-1 py-2 text-base rounded-xl outline-none bg-gray-300 dark:bg-[#343a40] focus:bg-white focus:ring-green-500 focus:ring-2 transition resize-none">
          {props.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductSelect