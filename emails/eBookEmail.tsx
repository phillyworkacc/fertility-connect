import { appUrl } from '@/utils/constants';
import {
   Body,
   Column,
   Container,
   Head,
   Html,
   Img,
   Link,
   Preview,
   Row,
   Section,
   Text,
 } from '@react-email/components';
 import * as React from 'react';
 
 interface JourneyToParahEBookEmailProps {
   username?: string;
 }
 
const baseUrl = appUrl;
 
 export const JourneyToParahEBookEmail = ({
   username
 }: JourneyToParahEBookEmailProps) => {
 
   return (
     <Html>
       <Head />
       <Body style={main}>
         <Preview>Your eBook Purchase - Journey to Parah</Preview>
         <Container style={container}>
           <Section style={logo}>
             <Img width={114} src={`${baseUrl}/logo.png`} />
           </Section>
           <Section style={sectionsBorders}>
             <Row>
               <Column style={sectionBorder} />
               <Column style={sectionCenter} />
               <Column style={sectionBorder} />
             </Row>
           </Section>
           <Section style={content}>
             <Text style={paragraph}>Hi {username},</Text>
             <Text style={paragraph}>Thank you for your purchase of Journey To Parah EBook — we appreciate your support!</Text>
             <Text style={paragraph}>Please see attached pdf for the EBook</Text>
             <Text style={paragraph}>Enjoy the read and thanks again!</Text>
             <Text style={paragraph}>
               Best Regards,
               <br />
               Fertility Connect Support Team
             </Text>
           </Section>
         </Container>
 
         <Section style={footer}>
           <Row>
             <Text style={{ textAlign: 'center', color: '#706a7b' }}>
               © {new Date().getFullYear()} Fertility Connect, All Rights Reserved <br />
             </Text>
           </Row>
         </Section>
       </Body>
     </Html>
   );
 };
 
 export default JourneyToParahEBookEmail;
 
 const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif';
 
 const main = {
   backgroundColor: '#efeef1',
   fontFamily,
 };
 
 const paragraph = {
   lineHeight: 1.5,
   fontSize: 14,
 };
 
 const container = {
   maxWidth: '580px',
   margin: '30px auto',
   backgroundColor: '#ffffff',
 };
 
 const footer = {
   maxWidth: '580px',
   margin: '0 auto',
 };
 
 const content = {
   padding: '5px 20px 10px 20px',
 };
 
 const logo = {
   display: 'flex',
   justifyContent: 'center',
   alingItems: 'center',
   padding: 30,
 };
 
 const sectionsBorders = {
   width: '100%',
   display: 'flex',
 };
 
 const sectionBorder = {
   borderBottom: '1px solid rgb(238,238,238)',
   width: '249px',
 };
 
 const sectionCenter = {
   borderBottom: '1px solid rgb(145,71,255)',
   width: '102px',
 };
 
 const link = {
   textDecoration: 'underline',
 };
 