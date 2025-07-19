import { reloadSession } from '@/lib/reloadSession';
import { useSession } from 'next-auth/react';
import { useState } from 'react'
import { getCodeForEmailChange, updateUserAccountEmail } from '../actions/user';
import { validateEmail } from '@/utils/validation';

export default function UpdateEmail() {
   const { data: session, update } = useSession();
   const [userEmail, setUserEmail] = useState(session?.user?.email as string);
   const [enteredCode, setEnteredCode] = useState('');
   const [theActualCode, setTheActualCode] = useState<string | undefined>(undefined);

   const getCodeForEmailVerification = async () => {
      if (!validateEmail(userEmail)) {
         alert("Please enter a valid email!");
         return;
      }
      const code = await getCodeForEmailChange(session?.user?.name!, userEmail);
      if (code === false) {
         alert('Failed to update your email');
         return;
      }
      setTheActualCode(code);
   }

   const onUpdateUserEmail = async () => {
      if (enteredCode === theActualCode) {
         const updatedUserEmail = await updateUserAccountEmail(session?.user?.email!, userEmail);
         if (!updatedUserEmail.success) {
            alert(updatedUserEmail.result);
            return;
         }
         update({
            ...session,
            user: {
               ...session?.user,
               email: userEmail
            }
         })
         setTheActualCode(undefined);
         alert(updatedUserEmail.result);
         reloadSession();
      } else {
         alert("Invalid Code")
      }
   }

   const onUpdateEmailButton = async () => {
      if (theActualCode === undefined) {
         await getCodeForEmailVerification();
      } else {
         await onUpdateUserEmail();
      }
   }

   return (<>
      <div className="ma-form-content">
         <input type="text" name="name" id="name" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
         {(theActualCode !== undefined) && (<>
            <br />
            <div className="text-c-sm">
               Please enter the code that has been sent to {userEmail} so you can verify that this your email.
               Please do not close or reload this page.
            </div>
            <input type="text" name="name" id="name" placeholder="Code" value={enteredCode} onChange={(e) => setEnteredCode(e.target.value)} />
         </>)}
         <button disabled={session?.user?.email! === userEmail} onClick={onUpdateEmailButton}>
            {(theActualCode == undefined) ? 'Change Email' : 'Verify Email'}
         </button>
      </div><br />
   </>)
}
