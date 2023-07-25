import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions
}

export function Input({ name, placeholder, type, register, rules, error }: InputProps) {
    return (
        <div className='w-full max-w-lg '>
            <input
                className="w-full border-b-2 border-zinc-500 px-2 h-8 mt-2 outline-none text-md"
                id={name}
                type={type}
                placeholder={placeholder}
                {...register(name, rules)}
            />
            {error && <p className='text-red-500 '>{error}</p>}
        </div>
    )
}