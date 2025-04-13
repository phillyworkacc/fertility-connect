import "./loading-action.css"
import React from 'react'
import { LoaderCircle } from 'lucide-react'
import { mainPurpleColour } from "@/utils/constants"

export default function LoadingAction ({
   actionText
}: { actionText: string }) {
   return (
      <div className='loading-action'>
         <div className="action-box">
            <div className="head">{actionText}</div>
            <div className="loading-spinner">
               <div className="loading">
                  <LoaderCircle strokeWidth={4} size={40} color={mainPurpleColour} />
               </div>
            </div>
         </div>
      </div>
   )
}
