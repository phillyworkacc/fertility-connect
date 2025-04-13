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
 
 interface FertilityInstitutionFormEmailProps {
   name: string;
 }
 
const baseUrl = appUrl;
 
 export const FertilityInstitutionFormEmail = ({
   name
 }: FertilityInstitutionFormEmailProps) => {
 
   return (
     <Html>
       <Head />
       <Body style={main}>
         <Preview>This is to confirm that your meeting has been successfully cancelled</Preview>
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
             <Text style={paragraph}>Thank you for submitting your details to appear on the Fertility Connect App. We’re excited about the opportunity to feature your fertility institution on our platform.</Text>
             <Text style={paragraph}>Our team is currently reviewing your submission to ensure it meets our quality and verification standards. This process typically takes a few business days, but we'll keep you updated along the way.</Text>
             <Text style={paragraph}>We appreciate your patience and look forward to potentially working together to support individuals and families on their fertility journeys.</Text>
             <Text style={paragraph}>If you have any questions in the meantime, feel free to reach out to us at <Link href={`${appUrl}/contact-form`}>our contact form</Link>.</Text>
             <Text style={paragraph}>
               Warm Regards,
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
 
 export default FertilityInstitutionFormEmail;
 
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
 