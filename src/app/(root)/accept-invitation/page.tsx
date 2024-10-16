"use client"
import Acceptinvitation from "@/components/navbar/accept-invitation";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams()  
  const token = searchParams.get('token')
  
  return (
    <div>
      <Acceptinvitation token={token}/>
    </div>
  )
}
