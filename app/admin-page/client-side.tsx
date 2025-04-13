"use client"
import AdminWrapper from '@/components/admin-wrapper/admin-wrapper';
import { appUrl } from '@/utils/constants';
import { Home } from 'lucide-react';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function AdminPageClientPage() {
   const { data: session } = useSession();
   const router = useRouter();

   return (
      <>
         <AdminWrapper username={session?.user?.name!} page="admin-home">
            <div>
               <div className="text-c-l bold-600">Welcome to the admin dashboard</div>
               <div className="text-c-m" style={{padding:"8px 0"}}>Want to go back to the main home page for all users? Click below.</div>
               <button onClick={() => router.push(`${appUrl}/home`)}>
                  <Home /> Main Home
               </button>
            </div>
         </AdminWrapper>
      </>
   )
}
