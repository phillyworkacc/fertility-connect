'use client'
import "./download-app.css"
import { useEffect, useState } from "react";

export default function DownloadApp() {
   const [isAndroid, setIsAndroid] = useState(false);
   const [isIOS, setIsIOS] = useState(false);

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
         const ua = userAgent.toLowerCase();

         setIsAndroid(ua.includes('android'));
         setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream);
      }
   }, []);

   const apkUrl = '/android-install/app-release.apk';

   if (isAndroid) {
      return (
         <section className='download-app'>
            <div className="page-container-landing">
               <div className="section-title text-c-xxl bold-800">Download Our Android App</div>
               <div className="content text-c-sm">
                  <p>Get the latest version of our app for Android. No Google Play required. Safe and fast direct download.</p>

                  <div className="button-download">
                     <a href={apkUrl} download><button>Download APK</button></a>
                  </div>

                  <section className="mt-10 text-left text-sm text-gray-600">
                     <div className="text-c-l bold-800">Download Our Android App</div>
                     <div className="step">1. Tap the "Download APK" button above.</div>
                     <div className="step">2. Once downloaded, open the file.</div>
                     <div className="step">3. You may be prompted to allow installations from unknown sources — enable it.</div>
                     <div className="step">4. Proceed with the installation. Enjoy the app!</div>
                  </section>
               </div>
            </div>
         </section>
      )
   } else if (isIOS) {
      return (
         <section className='download-app'>
            <div className="page-container-landing">
               <div className="section-title text-c-xxl bold-800">Download The App on iOS</div>
               <div className="content text-c-sm">
                  <p>Get the latest version of our app for iOS. No App Play required. Safe and fast direct download. Click below and follow the installation guide.</p>
   
                  <div className="button-download">
                     <a href={'/ios-install'}><button>Download for iOS</button></a>
                  </div>
               </div>
            </div>
         </section>
      )
   } else {
      return (<></>)
   }
}
