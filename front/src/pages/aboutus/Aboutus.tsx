import React from 'react'
import Header from "@components/header/Header";
import Footer from '@components/footer/Footer';
import {
    Container, FifthContentBody,
    FirContentBody,
    FirstContent,
    FourthContentBody,
    ImageFir,
    SecContentBody,
    ThrContentBody,
    ContactUs, ContentOfContactUs, TableOfContactUs, SixthContentBody,
} from "@pages/aboutus/style";
import useInput from "@utils/useInput";

const Aboutus = () => {
    const [firName, onChangeFirName] = useInput('');
    const [lastName, onChangeLastName] = useInput('');
    const [email, onChangeEmail] = useInput('');
    const [phone, onChangePhoneNum] = useInput('');
    const [company, onChangeCompany] = useInput('');
    const [message, onChangeMessage] = useInput('');

    return (
        // <Container style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/mainpage/background1.jpg'})`}}>
        <Container >
            <Header/>
                <FirContentBody>
                    <ImageFir style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/aboutus/background6.jpeg'})`}}/>
                    <FirstContent>
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                        <h4>Nullam id augue ut justo imperdiet aliquet non quis nibh.</h4>
                        <h4>Sed lacinia lacus in tellus hendrerit varius eu eget sem.</h4>
                    </FirstContent>
                </FirContentBody>
                <SecContentBody>
                    asa
                </SecContentBody>
                <ThrContentBody>
                    팀원 소개
                </ThrContentBody>
                <ContactUs>
                    <div>
                        HOW CAN WE HELP
                        <span> </span>
                        <span style={{textDecoration: "underline"}}>YOU</span>
                        ?
                    </div>
                    <ContentOfContactUs>
                        Do you have an audience you need to persuade to take action? Persuading readers to take action is why we started a direct response copywriting agency, so we would love to hear more about what you would like to achieve with your marketing. Please send us a message in the form below, <a href="mailto:aipooh8882@naver.com">email us</a> or call us on <a href="tel:021234567">02 123 4567</a>.
                    </ContentOfContactUs>
                    <form>
                        <TableOfContactUs>
                            <tr>
                                <td>
                                    <input name="input_1" type="text" value={firName} onChange={onChangeFirName}
                                           placeholder="First Name*" aria-required="true" aria-invalid="false"/></td>
                                <td>
                                    <input name="input_2" type="text" value={lastName} onChange={onChangeLastName}
                                           placeholder="Last Name*" aria-required="true" aria-invalid="false"/></td>
                            </tr>
                            <tr>
                                <td>
                                    <input name="input_3" type="text" value={email} onChange={onChangeEmail}
                                           placeholder="Email*" aria-required="true" aria-invalid="false"/></td>
                                <td>
                                    <input name="input_4" type="text" value={phone} onChange={onChangePhoneNum}
                                           placeholder="Phone Number*" aria-required="true" aria-invalid="false"/></td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <input name="input_5" type="text" value={company} onChange={onChangeCompany}
                                           placeholder="Company*" aria-required="true" aria-invalid="false"/></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><textarea name="input_6" placeholder="Message*" aria-required="true" value={message}
                                                          aria-invalid="false" rows={10} cols={50} onChange={onChangeMessage}/></td>
                            </tr>
                        </TableOfContactUs>
                    </form>

                </ContactUs>
                <FourthContentBody>
                    협업한? 브랜드 소개
                </FourthContentBody>
                <FifthContentBody>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <div>“Love, don't fight. But fight for what you love.” <br/><br/><br/>
                        ― Richie Norton</div>
                </FifthContentBody>
                <SixthContentBody>

                </SixthContentBody>
        </Container>
    )

}
export default Aboutus;