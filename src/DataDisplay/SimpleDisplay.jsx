import React from 'react'
import './SimpleDisplay.css'
function SimpleDisplay({value,max}) {
  return (
    <div className={`w-full text-center py-2 rounded-md col-span-6  my-4 ${max ? 'border-2 border-red-900 bg-red-t' : 'bg-blue-t ml-12 border-2  border-blue-900'}`}>
        {value.text}: {value.value} €/MWh
    </div>
  )
}

export default SimpleDisplay