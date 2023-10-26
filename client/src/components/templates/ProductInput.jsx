import React from 'react'

const ProductInput = (props) => {
  return (
    <div>
        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900  dark:text-gray-400">
            {props.name}
        </label>
        <div className="my-2">
            {props.type==="input"&&(
                <input placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.onChange} type="text" className="w-full px-4 py-2 text-base rounded-xl outline-none bg-gray-300 dark:bg-[#343a40] focus:bg-white focus:ring-green-500 focus:ring-2 transition resize-none"/>
            )}
            {props.type==="number"&&(
                <input placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.onChange} type="number" className="w-full px-4 py-2 text-base rounded-xl outline-none bg-gray-300 dark:bg-[#343a40] focus:bg-white focus:ring-green-500 focus:ring-2 transition resize-none"/>
            )}
            {props.type==="textarea"&&(
                <textarea placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.onChange} rows={3} className="w-full px-4 py-2 text-base rounded-xl outline-none bg-gray-300 dark:bg-[#343a40] focus:bg-white focus:ring-green-500 focus:ring-2 transition resize-none" />
            )}
        </div>
    </div>
  )
}

export default ProductInput