import React, {useState} from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const { register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("")
    
    const create = async(data) =>{
        setError("")
        try{
            const userData = await authService.createAccount(data)
            if(userData){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData))
                navigate("/")
            }
        }catch(error){
            setError(error.message)
        }
    }

  return (
    <div>
        <div className='max-auto w-full'>
            <div>
            <span>
                <Logo />
            </span>
            </div>
            <h2 className='text-center'>
                Sign Up to create account
            </h2>
            <p>
                Already have an account
                <Link 
                    to="/login"
                    className='font-medium text-primary hover:underline'
                >
                    Sign In
                </Link>
            </p>
            {error && <p>
                {error}
            </p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input
                    label="Full Name: "
                    placeholder="Enter you full name"
                    {...register("name", {
                        required:true
                    })}
                    />
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
                        required:true
                    })}             
                    />
                    <Button
                    type="submit"
                    className="w-full">
                        Create Account
                    </Button>       
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup