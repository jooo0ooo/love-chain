import React from 'react'
import Header from "@components/header/Header";
import Footer from '@components/footer/Footer';
import {Container, ContentBody, FirstContent} from "@pages/aboutus/style";

const Aboutus = () => {

    return (
        <Container style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/mainpage/background1.jpg'})`}}>
            <Header/>
                <ContentBody>
                    <FirstContent>
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                        <h4>Nullam id augue ut justo imperdiet aliquet non quis nibh.</h4>
                        <h4>Sed lacinia lacus in tellus hendrerit varius eu eget sem.</h4>
                    </FirstContent>
                </ContentBody>
            <Footer/>
        </Container>
    )

}
export default Aboutus;