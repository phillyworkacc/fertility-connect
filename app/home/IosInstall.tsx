'use client'
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react'

export default function IosInstall() {
   const [iPhoneOrIpadUser, setIPhoneOrIpadUser] = useState(false);

   function isIphoneOrIpad(): boolean {
      const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
      const platform = navigator.platform;

      const isIOS = /iPhone|iPad|iPod/.test(ua);
      const isMacWithTouch = platform === 'MacIntel' && navigator.maxTouchPoints > 1;

      return isIOS || isMacWithTouch;
   }

   useEffect(() => {
      setIPhoneOrIpadUser(isIphoneOrIpad());
   }, [])

   return (<>
      {
         iPhoneOrIpadUser
         ? <>
            <Link href='/ios-install'>
               <div className="body-section-content-card">
                  <div className="image"><img src="./favicon.logo.png" alt="card-image" /></div>
                  <div className="name">iPhone/iPad Install Guide</div>
                  <div className="open-arrow-i"><ArrowRight /></div>
               </div>
            </Link>
         </>
         : <></>
      }
   </>)
}
