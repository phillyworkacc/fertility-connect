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
 
 interface TwitchResetPasswordEmailProps {
   username?: string;
   updatedDate?: Date;
   resetLink?: string;
 }
 
const baseUrl = process.env.APP_URL || 'http://localhost:3000';
 
 export const ResetPasswordEmail = ({
   username,
   updatedDate,
   resetLink
 }: TwitchResetPasswordEmailProps) => {
   const formattedDate = new Intl.DateTimeFormat('en', {
     dateStyle: 'medium',
     timeStyle: 'medium',
   }).format(updatedDate);
 
   return (
     <Html>
       <Head />
       <Body style={main}>
         <Preview>You have request to change the password for your Fertility Connect account</Preview>
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
             <Text style={paragraph}>
               You requested to make a change to your password on your Fertility Connect account on{' '}
               {formattedDate}. If this was not you, please ignore this email as no further action is
               required.
             </Text>
             <Text style={paragraph}>
               However if you did request to change your password, please{' '}
               <Link href={resetLink} style={link}>
                 reset your account password
               </Link>{' '}
               immediately.
             </Text>
             <Text style={paragraph}>
               Remember to use a password that is both strong and unique to your
               Fertility Connect account.
             </Text>
             <Text style={paragraph}>
               Thanks,
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
 
 ResetPasswordEmail.PreviewProps = {
   username: 'alanturing',
   updatedDate: new Date('June 23, 2022 4:06:00 pm UTC'),
 } as TwitchResetPasswordEmailProps;
 
 export default ResetPasswordEmail;
 
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
 