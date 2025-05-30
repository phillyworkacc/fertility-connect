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
 
 interface FertilityInstitutionApprovedEmailProps {
   name: string;
   clinicCode: string;
 }
 
const baseUrl = appUrl;
 
 export const FertilityInstitutionApprovedEmail = ({
   name, clinicCode
 }: FertilityInstitutionApprovedEmailProps) => {
 
   return (
     <Html>
       <Head />
       <Body style={main}>
         <Preview>Thank You for Registering — Review in Progress</Preview>
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
             <Text style={paragraph}>Hi {name},</Text>
             <Text style={paragraph}>We're happy to let you know that your fertility institution has been approved and is now officially listed on the Fertility Connect App !</Text>
             <Text style={paragraph}>Your fertility institution is now visible to users who are exploring fertility options and seeking trusted care. Thank you for partnering with us to make quality fertility support more accessible.</Text>
             <Text style={paragraph}>If you want to manage and update details about your fertility clinic <Link href={`${appUrl}/clinic-manager`}>click here</Link>.</Text>
             <Text style={paragraph}>This is your clinic code <b>(do not share this with anyone)</b>: {clinicCode}.</Text>
             <Text style={paragraph}>If you have any questions or need support, don't hesitate to reach out at <Link href={`${appUrl}/contact-form`}>our contact form</Link>.</Text>
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
 
 export default FertilityInstitutionApprovedEmail;
 
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
 