'use client'
import { BASE_URL } from '@/constants';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import Cookies from 'universal-cookie'
import { useRouter } from 'next/navigation'
 


export const GoogleAuth = () => {
    const router = useRouter()
    const cookies= new Cookies()
    return (
        <GoogleOAuthProvider clientId="1090177201451-bi2tt3gilbgk3gk868hsfuajk372hghj.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse); 
                   axios.post(`${BASE_URL}/auth/googleAuth`,credentialResponse).then((res:any)=>{
                    console.log(res.data.token);
                    localStorage.setItem("token",res?.data?.token)
                    cookies.set("token",res?.data?.token,{ path: '/' })
                    router.push("notes")
                   }).catch((error)=>{
                    console.log(error);
                   })
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </GoogleOAuthProvider>
    )
}