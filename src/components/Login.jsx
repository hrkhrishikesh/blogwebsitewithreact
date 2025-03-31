import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) =>{
        setError("")
        try{
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        }catch(error){
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'>
        <div>
            <div>
                <span>
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className=''>
                Sign in to Your Account
            </h2>
            <p>
                Don't have An account
                <Link to = "/signup"
                className = "font-medium text-primary hover:underline">
                Sign Up
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>
                {error}
            </p>}
            <form onSubmit={handleSubmit(login)}>
                <div>
                    <Input
                    label = "Email: "
                    placeholder = "Enter you email"
                    type = "email"
                    {...register("email", {
                        required:true,
                        validate: {
                            isEmail: (value) =>
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email address"
                        }
                    })}
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter you password"
                    {...register("password", {
                        required:true,
                    })}
                    />
                    <Button
                    type = "submit"
                    className = "w-full"
                    >
                    Sign In
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login