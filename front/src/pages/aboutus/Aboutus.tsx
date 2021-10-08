import React from 'react'
import Header from "@components/header/Header";
import Footer from '@components/footer/Footer';
import {Container, ContentBody, FirstContent, ImageFir, SecContentBody} from "@pages/aboutus/style";
import image from "img/aboutus/background3.jpeg";

const Aboutus = () => {

    return (
        // <Container style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/mainpage/background1.jpg'})`}}>
        <Container >
            <Header/>
                <ContentBody>
                    <ImageFir style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/aboutus/background6.jpeg'})`}}/>
                    <FirstContent>
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                        <h4>Nullam id augue ut justo imperdiet aliquet non quis nibh.</h4>
                        <h4>Sed lacinia lacus in tellus hendrerit varius eu eget sem.</h4>
                    </FirstContent>
                </ContentBody>
                <SecContentBody>
                    asa
                </SecContentBody>
            {/*<Footer/>*/}
        </Container>
    )

}
export default Aboutus;