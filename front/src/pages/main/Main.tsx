import React from 'react'
import Header from '@components/header/Header';
import { customAxios } from '@src/utils/CustomAxios';
import { ToastContainer, toast } from 'react-toastify';
import '@pages/main/Main.css'

function Main(): JSX.Element {

    const registerOpenBanking = async () => {
        const res = await customAxios.get('/openbanking/register');
        if (res.data) {
            window.location.href = res.data;
        } else {
            toast.error("Error!", {theme: "colored"});
        }
    }
    
    return (
        <div style={{height: "100%"}}>
            <Header/>
            <div className="content" style={{height: "90%"}}>
                <div style={{height: "70%"}}>
                    <div style={{width: "60%", height: "100%", float: "left", backgroundColor: "red"}}>
                        left
                        <div 
                            onClick={registerOpenBanking}
                            style={{backgroundColor: 'black', color: 'white', padding: '50px', display: 'inline-block', width: '50%', marginTop: '150px', marginLeft: '100px', textAlign: 'center', cursor: 'pointer'}}
                        >
                            Test
                        </div>
                    </div>
                    <div style={{width: "40%", height: "100%", float: "left", backgroundColor: "blue"}}>
                        right
                    </div>
                </div>
                <div style={{height: "30%", backgroundColor: "green"}}>
                    bottom
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Main;