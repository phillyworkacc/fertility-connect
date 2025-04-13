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
 
 interface SubscribedUserEmailProps {
   username?: string;
 }
 
const baseUrl = appUrl;
 
 export const SubscribedUserEmail = ({
   username
 }: SubscribedUserEmailProps) => {
 
   return (
     <Html>
       <Head />
       <Body style={main}>
         <Preview>🎉 Welcome to Fertility Connect - You're a Subscriber!</Preview>
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
             <Text style={paragraph}>Thanks for subscribing to Fertility Connect - we're excited to have you on board!</Text>
             <Text style={paragraph}>
                Here's what you can do next: <br />
                <ul>
										<li>Access the Booking Calendar</li>
										<li>Book consultations</li>
										<li>View Fertility Tips, Lifestyle and Diet Tips</li>
                </ul>
            </Text>
             <Text style={paragraph}>Let’s get to it.</Text>
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
 
 export default SubscribedUserEmail;
 
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
 