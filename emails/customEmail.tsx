import { appUrl } from '@/utils/constants';
import { Body, Container, Head, Html, Img, Text } from '@react-email/components';
import * as React from 'react';

interface CustomEmailProps {
   content: string;
}
 
const baseUrl = appUrl;
 
export const CustomEmail = ({ content }: CustomEmailProps) => (
<Html>
   <Head />
   <Body style={main}>
      <Container style={container}>
         <Img
            src={`${baseUrl}/logo.landing.png`}
            width="170"
            height="50"
            alt="Koala"
            style={logo}
         />
         <Text style={paragraph}>{content}</Text>
      </Container>
   </Body>
</Html>
);
 
export default CustomEmail;

const main = {
   backgroundColor: '#ffffff',
   fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
   margin: '0 auto',
   padding: '20px 0 48px',
};

const logo = {
   margin: '0 auto',
};

const paragraph = {
   fontSize: '16px',
   lineHeight: '26px',
};