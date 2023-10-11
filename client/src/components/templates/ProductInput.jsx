import React from 'react'

const ProductInput = (props) => {
  return (
    <div>
        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
            {props.name}
        </label>
        <div className="my-2">
            {props.type==="input"&&(
                <input placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.onChange} type="text" className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            )}
            {props.type==="textarea"&&(
                <textarea placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.onChange} rows={3} className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={''} />
            )}
        </div>
    </div>
  )
}

export default ProductInput