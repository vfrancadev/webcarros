import logoImg from '../../assets/logo.svg'
import { Container } from '../../components/container'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../../components/input'
import { useEffect } from 'react'
import { useContext } from 'react'
 import { AuthContext } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

import { useForm} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { auth } from '../../services/firebaseConnection'
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'


const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  email: z.email("Insira um email válido").nonempty("O campo email é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").nonempty("O campo senha é obrigatorio")
})

type FormData = z.infer<typeof schema>

export function Register() {


  const {handleInfoUser} = useContext(AuthContext);
  const navigate = useNavigate();
const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
  resolver: zodResolver(schema),
  mode: "onChange"
})


useEffect(() =>{
    async function handleLogout(){
      await signOut(auth);
    }

    handleLogout();
}, [])

function onSubmit(data: FormData){
  console.log(data)
  createUserWithEmailAndPassword(auth, data.email, data.password)
  .then( async (user) => {
  await updateProfile(user.user, {
    displayName: data.name
  })
    handleInfoUser({
      name: data.name,
      email: data.email,
      uid: user.user.uid,
    })


  console.log("cadastro realizado com sucesso")

  toast.success("Bem vindo ao WebCarros")
  navigate("/dashboard", {replace: true})

  }).catch( (error) =>{
  console.log("error ao cadastrar" + error)
  toast.error("Erro ao cadastrar usuario.")
  })

}

  return (
   <Container>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <Link to="/" className='mb-6 max-w-sm w-full'>
        <img className='w-full' src={logoImg} alt="Logo do site"
        />
        </Link>

        <form className="bg-white max-w-xl w-full rounded-lg p-4"
        onSubmit={handleSubmit(onSubmit)}>

        <div className='mb-3'>
                      <Input
        type="text"
        placeholder="Digite seu nome completo"
        name="name"
        error={errors.name?.message}
        register={register}/>
            </div>

            <div className='mb-3'>
                      <Input
        type="email"
        placeholder="Digite seu email"
        name="email"
        error={errors.email?.message}
        register={register}/>
            </div>
                    <div className='mb-3'>
                      <Input
        type="password"
        placeholder="Digite sua senha"
        name="password"
        error={errors.password?.message}
        register={register}/>
            </div>

        <button type='submit' className='w-full bg-zinc-900 text-white h-10 rounded-md pointer'>
          Cadastrar
        </button>
      </form>

      <Link to="/login">

      Já possui uma conta? Faça o login !
      
      </Link>
      </div>
      </Container>

  )
}


