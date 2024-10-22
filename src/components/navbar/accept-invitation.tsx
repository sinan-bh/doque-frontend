import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../ui/spinner/spinner";
import { useAppSelector } from "@/lib/store/hooks";

type Invite = {
    redirectUrl: string;
}

export default function Acceptinvitation({ token }: { token: string | null }) {
    const [invite,setInvite] = useState<Invite | null>(null)
    const {loggedUser } =useAppSelector((state)=>state.user)

  console.log(invite);
  

  useEffect(() => {
    if (token && loggedUser?.id) {
      const fetchData = async () => {
        try {
          const {data}  = await axios.get(
            `/accept-invitation?token=${token}`,
            {
              headers: {
                Authorization: `Bearer ${loggedUser?.token}`,
              },
            }
          );
          setInvite(data)
        } catch (err) {
          if (err instanceof AxiosError && err.response?.status === 404) {
            console.error("Token  not found");
          } else {
            console.error(err);
          }
        }
      };
      fetchData();
    }
  }, [token,loggedUser?.id]);



  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
}
