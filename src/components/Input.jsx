import React from 'react'

const Input = ({type,placeholder,value,id,InputTitle, children, className, onChange}) => {
  return (
    <div className={`${className}`}>
        <label className='font-bold text-2xl block mb-2' htmlFor={id}>{InputTitle}</label>
        <input onChange={onChange} className={`px-3 py-2 rounded-md w-full outline-none `} type={type} placeholder={placeholder} value={value} id={id} />
        {children}
        
    </div>
  )
}

export default Input