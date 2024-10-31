import React from 'react'

const Input = ({type,placeholder,value,id,InputTitle, children, className, onChange}) => {
  return (
    <div className={`${className}  w-[478px]`}>
        <label className={`mb-[18px] text-lg text-[#484848] inline-block }`} htmlFor={id}>{InputTitle}</label>
        <input onChange={onChange} className={`px-3 py-2 rounded-[5px] w-full outline-none border border-[#D8D8D8] `} type={type} placeholder={placeholder} value={value} id={id} />
        {children}
        
    </div>
  )
}

export default Input