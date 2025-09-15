'use client'
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

type ToolProps = {
   imageSrc: string;
   label: string;
   href: string;
}

export default function Tool ({ imageSrc, label, href }: ToolProps) {
   const router = useRouter();
   return (
      <div className="body-section-content-card" onClick={() => router.push(href)}>
         <div className="image"><img src={imageSrc} alt="card-image" /></div>
         <div className="name">{label}</div>
         <div className="open-arrow-i"><ArrowRight /></div>
      </div>
   )
}
