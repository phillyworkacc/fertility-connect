'use client'
import "@/styles/main.css"
import "@/styles/clinic-form.css"
import Link from "next/link"

export default function PrivacyPolicyPage () {
   return <>
      <div className='body-container'>
         <div className="clinic-form">
            <div className="logo">
               <img src="./logo.png" alt="logo" />
            </div><br />

            <div className="text-c-xl bold-600">Privacy Policy for The Fertility Connect</div>
            <div className="text-c-sm">Effective Date: 1 May 2025</div>

            <br />

            <div className="text-c-sm">
            At The Fertility Connect, your privacy is important to us. This Privacy Policy outlines what information we collect, how we use it, and your rights in relation to your data.
            </div>

            <br />

            <div className="text-c-xl bold-600">1. Information We Collect</div>
            <div className="text-c-sm">
            We may collect the following types of data when you use our site:
            <ul className="text-c-sm">
               <li><strong>Personal Information</strong>: Name, email address, and any information you submit through our contact forms.</li>
            </ul>
            </div>

            <br />

            <div className="text-c-xl bold-600">2. How We Use Your Information</div>
            <div className="text-c-sm">
            We use the collected data to:
            <ul className="text-c-sm">
               <li>Provide, operate, and maintain our website</li>
               <li>Respond to inquiries and provide customer support</li>
               <li>Improve website functionality and user experience</li>
            </ul>
            </div>

            <br />

            <div className="text-c-xl bold-600">3. Sharing of Your Information</div>
            <div className="text-c-sm">
            We do <strong>not</strong> sell or rent your personal data.
            </div>

            <br />

            <div className="text-c-xl bold-600">4. Your Rights</div>
            <div className="text-c-sm">
            You have the right to:
            <ul className="text-c-sm">
               <li>Delete your information</li>
               <li>Withdraw consent at any time (e.g., delete your account)</li>
            </ul>
            </div>

            <br />

            <div className="text-c-xl bold-600">5. Data Security</div>
            <div className="text-c-sm">
            We implement reasonable measures to protect your data, but no system is 100% secure. Use the website at your own discretion.
            </div>

            <br />

            <div className="text-c-xl bold-600">6. Third-Party Links</div>
            <div className="text-c-sm">
            Our website may contain links to other websites. We are not responsible for their content or privacy practices.
            </div>

            <br />

            <div className="text-c-xl bold-600">7. Children's Privacy</div>
            <div className="text-c-sm">
            Our website is not intended for children under the age of 18, and we do not knowingly collect data from them.
            </div>

            <br />

            <div className="text-c-xl bold-600">8. Updates to This Policy</div>
            <div className="text-c-sm">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with the revised date.
            </div>

            <br />

            <div className="text-c-xl bold-600">Contact Us</div>
            <div className="text-c-sm">
            If you have any questions about this Privacy Policy, contact us at:<br />
            <strong>Form</strong>: <Link href='/contact-form' target="_blank" className="visible-link">Contact Form</Link><br />
            <strong>Website</strong>: <Link href="https://thefertilityconnect.com" className="text-c-sm visible-link">https://thefertilityconnect.com</Link>
            </div>

         </div>
      </div>
   </>
}
