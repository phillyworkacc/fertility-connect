"use client"
import "@/styles/tip-form.css"
import { insertDietTip, insertFertilityTip, insertLifestyleTip } from '@/app/actions/admin';
import AdminWrapper from '@/components/admin-wrapper/admin-wrapper';
import { formatDate } from '@/utils/date';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { convertWordDocToText } from "@/lib/docToTxt";

type TipType = "diet" | "lifestyle" | "fertility"

export default function TipForm() {
   const { data: session } = useSession();
   const date = new Date();

   const [title, setTitle] = useState("")
   const [text, setText] = useState("")

   const [imageBase64, setImageBase64] = useState("")

   const [isUploadingText, setIsUploadingText] = useState(false)
   const [tipType, setTipType] = useState("diet" as TipType)


   const imageAddedFunc = (event: any) => {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
         setImageBase64(ev.target?.result! as string);
      }
      fileReader.readAsDataURL(file);
   }

   const uploadDoc = (event: any) => {
      const file = event.target.files[0];
      const type = file.type.split("/")[1];
      const fileReader = new FileReader();

      fileReader.onload = async (ev) => {
         if (type == "msword" || type == "vnd.openxmlformats-officedocument.wordprocessingml.document") {
            let res = await convertWordDocToText(fileReader.result as any);
            if (res !== false) setText(res); else {
               alert("Failed to get text from document.")
            }
         }
      }
      fileReader.readAsArrayBuffer(file);
   }

   const addTip = async () => {
      if (title == "" || text == "") {
         alert("Please enter some text or a title");
         return;
      }

      let res;
      if (tipType == "diet") {
         res = await insertDietTip(title, text, imageBase64, `${date.getTime()}`)
      } else if (tipType == "fertility") {
         res = await insertFertilityTip(title, text, imageBase64, `${date.getTime()}`)
      } else if (tipType == "lifestyle") {
         res = await insertLifestyleTip(title, text, imageBase64, `${date.getTime()}`)
      }

      if (res) {
         setTitle("");
         setText("");
         alert("Tip Added !");
      } else {
         alert(res);
      }
   }

   return (
      <>
         <AdminWrapper username={session?.user?.name!} page="tips">
            <div>
               <div className="text-c-l bold-600" style={{padding:"8px 0"}}>Add a Tip</div><br />

               <div className="text-c-sm bold-700">Type of Tip</div>
               <div className="selector">
                  <div className={`select-option ${tipType == "fertility" ? "selected" : ""}`} onClick={() => setTipType("fertility")}>
                     Fertility
                  </div>
                  <div className={`select-option ${tipType == "lifestyle" ? "selected" : ""}`} onClick={() => setTipType("lifestyle")}>
                     Lifestyle
                  </div>
                  <div className={`select-option ${tipType == "diet" ? "selected" : ""}`} onClick={() => setTipType("diet")}>
                     Diet
                  </div>
               </div><br /><br />

               <div className="form-content">
                  <input type="text" name="title" placeholder='Tip Title' value={title} onChange={(e) => setTitle(e.target.value)} />
               </div><br /><br />

               <div className="form-content">
                  <div className="title text-c-sm bold-700">Tip Text</div>
                  <div className="selector">
                     <div 
                        className={`select-option ${!isUploadingText ? "selected" : ""}`} 
                        onClick={() => setIsUploadingText(false)}
                     >Type Text</div>
                     <div 
                        className={`select-option ${isUploadingText  ? "selected" : ""}`}
                        onClick={() => setIsUploadingText(true)}
                     >Upload Text</div>
                  </div>
                  {(isUploadingText) ? <>
                     <b className="text-c-s" style={{display:"block",padding:"8px 0"}}>Make sure these documents do not contain any images</b>
                     <input type="file" name="tip-image" accept='application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword' style={{ background: "white" }} onChange={(e) => uploadDoc(e)} />
                     <br />
                  </> : <>
                     <div className="form-content">
                        <textarea placeholder='Tip Text' value={text} onChange={(e) => setText(e.target.value)}></textarea>
                     </div><br />
                  </>}
               </div><br /><br />
               
               <div className="form-content">
                  <div className="title text-c-sm bold-700">Upload Image</div>
                  <label htmlFor="tip-image">
                     <div className="image-uploader">
                        <input 
                           type="file" 
                           name="tip-image" 
                           id="tip-image" 
                           onChange={(e) => imageAddedFunc(e)} 
                           accept='image/png, image/jpg, image/jpeg' />
                        {(imageBase64 !== "") ? <>
                           <img src={imageBase64} alt="tip preview image" />
                        </> : <>Drag or Click to upload image</>}
                     </div>
                  </label>
               </div><br /><br />
               
               <div className="date text-c-sm">
                  {formatDate(date.getDate(), date.getMonth()+1, date.getFullYear())}
               </div><br />
               
               <button onClick={addTip}>Post Tip</button>
            </div>
         </AdminWrapper>
      </>
   )
}
