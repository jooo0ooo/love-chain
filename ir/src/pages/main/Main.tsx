import React from 'react'
import Header from '@components/header/Header';
import { myAxios } from '@utils/myAxios';
import { ToastContainer, toast } from 'react-toastify';
import '@pages/main/Main.css'

function Main(): JSX.Element {
    window.location.href = 'http://localhost:3139/';
    const registerOpenBanking = async () => {
        const res = await myAxios.get('/openbanking/register');
        if (res.data) {
            window.location.href = res.data;
        } else {
            toast.error("Error!", {theme: "colored"});
        }
    }
    
    return (
        <div style={{height: "100%"}}>
            <Header/>
            
            <ToastContainer />
        </div>
    )
}

export default Main;