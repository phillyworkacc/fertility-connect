"use client"
import "./diet-tip.css"
import React from 'react'
import { formatDate } from "@/utils/date";

export default function DietTip({ dietTip }: { dietTip: DietTip }) {
   const { title, text, pubDate, image } = dietTip;
   let publishedDateObject = new Date(parseInt(pubDate));
   let formattedPublishedDate = formatDate(
      publishedDateObject.getDate(),
      publishedDateObject.getMonth() + 1,
      publishedDateObject.getFullYear()
   );

   return (
      <div className="diet-tip">
         <div className="title">{title}</div>
         {(image) ? <div className="image">
            <img src={`./tip-image/${image}`} />
         </div> : <></>}
         <div className="desc" dangerouslySetInnerHTML={{ __html: text}}></div><br />
         <div className="date">{formattedPublishedDate}</div>
      </div>
   )
}
