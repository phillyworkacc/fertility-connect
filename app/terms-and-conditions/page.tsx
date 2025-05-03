'use client'
import "@/styles/main.css"
import "@/styles/clinic-form.css"
import Link from "next/link"

export default function TermsAndConditionsPage () {
   return <>
      <div className='body-container'>
         <div className="clinic-form">
            <div className="logo">
               <img src="./logo.png" alt="logo" />
            </div><br />

            <div className="text-c-xl bold-600">Terms and Conditions for The Fertility Connect</div>
            <div className="text-c-sm">Effective Date: 1 May 2025</div><br /><br />

            <div className="text-c-sm">
            Welcome to The Fertility Connect. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. If you do not agree with these terms, please do not use our site.
            </div>

            <br /><br />

            <div className="text-c-xl bold-600">1. Use of Website</div>
            <div className="text-c-sm">
            You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment of the site.
            </div>

            <br />

            <div className="text-c-xl bold-600">2. Intellectual Property</div>
            <div className="text-c-sm">
            All content on this site—including text, graphics, logos, images, and software—is the property of The Fertility Connect or its licensors and is protected by copyright and intellectual property laws. You may not copy, reproduce, distribute, or create derivative works without our prior written consent.
            </div>

            <br />

            <div className="text-c-xl bold-600">3. Disclaimer of Medical Advice</div>
            <div className="text-c-sm">
            The content provided on The Fertility Connect is for informational purposes only and is <strong>not</strong> a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions you may have regarding a medical condition.
            </div>

            <br />

            <div className="text-c-xl bold-600">4. Limitation of Liability</div>
            <div className="text-c-sm">
            To the fullest extent permitted by law, The Fertility Connect shall not be liable for any damages, including but not limited to direct, indirect, incidental, or consequential damages, arising from your use of the site or reliance on any content provided.
            </div>

            <br />

            <div className="text-c-xl bold-600">5. Links to Third-Party Sites</div>
            <div className="text-c-sm">
            Our site may contain links to third-party websites for your convenience. We are not responsible for the content, accuracy, or privacy practices of those external sites.
            </div>

            <br />

            <div className="text-c-xl bold-600">6. User Submissions</div>
            <div className="text-c-sm">
            If you submit any content (e.g., comments, questions, feedback), you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, and distribute it in any format or media.
            </div>

            <br />

            <div className="text-c-xl bold-600">7. Privacy</div>
            <div className="text-c-sm">
               Your use of this website is also governed by our <Link href="/privacy-policy" className="text-c-sm visible-link">Privacy Policy</Link>, which outlines how we collect and use your data.
            </div>

            <br />

            <div className="text-c-xl bold-600">8. Termination</div>
            <div className="text-c-sm">
            We reserve the right to restrict or terminate your access to the website at our sole discretion, without notice, for any reason, including violation of these terms.
            </div>

            <br />

            <div className="text-c-xl bold-600">9. Changes to These Terms</div>
            <div className="text-c-sm">
            We may update these Terms and Conditions at any time. Changes will be posted on this page with an updated effective date. Your continued use of the site constitutes your acceptance of the new terms.
            </div>

            <br />

            <div className="text-c-xl bold-600">10. Governing Law</div>
            <div className="text-c-sm">
            These terms are governed by the laws of [Insert Jurisdiction, e.g., the State of New York, USA], and you consent to the exclusive jurisdiction of its courts.
            </div>

            <br />

            <div className="text-c-xl bold-600">Contact Us</div>
            <div className="text-c-sm">
            If you have any questions about these Terms and Conditions, contact us at:<br />
            <strong>Form</strong>: <Link href='/contact-form' target="_blank" className="visible-link">Contact Form</Link><br />
            <strong>Website</strong>: <Link href="https://thefertilityconnect.com" className="text-c-sm visible-link">https://thefertilityconnect.com</Link>
            </div>

         </div>
      </div>
   </>
}