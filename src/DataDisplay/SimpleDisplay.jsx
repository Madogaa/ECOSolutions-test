import React from 'react'
import './SimpleDisplay.css'
function SimpleDisplay({value,max}) {
  return (
    <div className={`w-fit py-2 px-4 rounded-md col-span-6 my-4 ${max ? 'border-2 border-red-900 bg-red-t' : 'bg-blue-t border-2 border-blue-900'}`}>
        {value.text}:
        {value.value}€/MWh,
    </div>
  )
}

export default SimpleDisplay