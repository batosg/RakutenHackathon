import React from 'react'

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    id: string;
    type: string;
}

const InputField = ({ label, placeholder, id, type, value, onChange }: InputFieldProps) => {
    return (
        <div>
            <label className='text-gray-700 text-sm font-bold mb-2' htmlFor={id}>{label}</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline' id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    )
}

export default InputField