import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '../../components/input';
import { api } from '../../services/api';

interface usuarioLogin {
    login: string,
    senha: string
}

const schema = z.object({
    email: z.string().email("Insira um email válido").nonempty("O campo email é obrigatório"),
    password: z.string().nonempty("O campo senha é obrigatório")
})

type FormData = z.infer<typeof schema>

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    const navigate = useNavigate()

    function handleLogin(e: FormData) {
        api.post('/validacao', {
            login: e.email,
            senha: e.password
        }, {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:5173/",
            },
            timeout: 1000
        })
            .then((validation) => {
                alert(JSON.stringify(validation.data.token))
                // window.location.href = 'http://cerejeiras.wcogeo.com.br:81'//navigate("/dashboard", { replace: true })
            })
            .catch((err) => {
                console.log(JSON.stringify(err))
            })
    }

    return (
        <div className="flex w-full h-screen bg-sky-700 justify-center items-center select-none">
            <img className="object-cover absolute h-screen" src="src/assets/Ortomosaico2.jpeg" alt="" />
            <div className="bg-blue-700  bg-opacity-0 flex w-full h-screen justify-center items-center absolute" />

            <form
                className="w-full max-w-2xl flex flex-col border-slate-100 border-2 items-center justify-center bg-slate-100 pb-8 rounded-xl bg-opacity-70 relative"
                onSubmit={handleSubmit(handleLogin)}
            >
                <img className="m-4 max-w-lg" src="src/assets/LOGO 06.png" alt="WCOGEO" />
                <Input
                    type='email'
                    placeholder='Digite seu email...'
                    name='email'
                    error={errors.email?.message}
                    register={register}
                />
                <Input
                    type='password'
                    placeholder='Digite sua senha...'
                    name='password'
                    error={errors.password?.message}
                    register={register}
                />
                <button
                    className="w-full max-w-lg bg-blue-900 text-white font-medium text-xl outline-none rounded-md mt-4 mb-4 p-3 hover:bg-blue-800 transition-all"
                    type="submit">
                    Entrar
                </button>
            </form>

        </div>
    )
}