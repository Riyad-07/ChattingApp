import * as Yup from 'yup';


export const SignUpV = Yup.object({
    name1: Yup.string().min(4).max(20).required('Please Enter Your Name'),
    email: Yup.string().email().required('Please Enter Your Email'),
    password: Yup.string().min(8).matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,'must use special character').required('Please Enter Your Password'),
})


export const SignInV = Yup.object({
    email: Yup.string().email().required('Please Enter Your Email'),
    password: Yup.string().min(8).required('Please Enter Your Password'),
})