import React from 'react';

interface SelectFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    placeholder: string;
    id: string;
    disabled?: boolean;
}

const SelectField = ({ 
    label, 
    placeholder, 
    id, 
    value,
    onChange, 
    options, 
    disabled = false,
}: SelectFieldProps) => {
    return (
        <div>
            <label className='text-gray-700 text-sm font-bold mb-2' htmlFor={id}>{label}</label>
            <select 
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline' 
                id={id} 
                value={value} 
                onChange={onChange}
                disabled={disabled}
            >
                <option value="" disabled selected>{placeholder || "選択してください"}</option> {/* プレースホルダーテキスト */}
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectField;
