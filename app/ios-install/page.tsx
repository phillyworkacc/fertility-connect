'use client'
import "@/styles/main.css"
import "@/styles/clinic-form.css"
import BackToHome from '@/components/back-to-home/back-to-home'
import { appUrl } from '@/utils/constants'
import { useRouter } from 'next/navigation'

export default function IosInstallGuid() {
   const router = useRouter();

   return (<>
      <div className='body-container'>
         <div className="clinic-form">
            <div className="logo">
               <img src={appUrl + '/logo.png'} alt="app-logo" />
            </div>

            <BackToHome>Back to Home</BackToHome>
            <div className="text-c-xxl bold-700 pd-1">Install Fertility Connect to your iPhone/iPad</div>
            <div className="text-c-sm grey bold-600">Please make sure you're using safari</div>
            
            <br /><br />

            <div className="text-c-l bold-600">Step 1</div>
            <div className="text-c-s grey pd-1">Tap on the share icon at the bottom of your browser (safari)</div>
            <div className="show-img">
               <img src="./ios-install/step1.jpg" alt="step1 image" />
            </div>
            
            <br /><br />

            <div className="text-c-l bold-600">Step 2</div>
            <div className="text-c-s grey pd-1">Tap on 'Add to home screen'</div>
            <div className="show-img">
               <img src="./ios-install/step2.jpg" alt="step2 image" />
            </div>
            
            <br /><br />

            <div className="text-c-l bold-600">Step 3</div>
            <div className="text-c-s grey pd-1">Tap on 'Add' and the app should appear on your home screen</div>
            <div className="show-img">
               <img src="./ios-install/step3.jpg" alt="step3 image" />
            </div>

            <br /><br />

            <button onClick={() => router.push("/home")}>Back to Home Page</button>
         </div>
      </div>
   </>)
}
