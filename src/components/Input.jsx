import React, {useId} from 'react'

const Input = React.forwardRef(function Input(
    {
        label,
        type = "text",
        className = "",
        ...props
    }, ref){

        const id = useId()

    return (
        <div className='w-full'>
            {label && <label className='block mb-1' htmlFor={id}>
                {label}
            </label>}
            <input
                type={type} className={`px-3 py-2 rounded-lg ${className}`}
                ref = {ref}
                {...props}
                id = {id}
            />
        </div>
    )
})

export default Input