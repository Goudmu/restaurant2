import Login from "@/components/Login";
import { UserType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";


const getData = async () => {
  const res = await fetch("http://localhost:3000/api/user", {
    cache: "no-store"
  })

  if(!res.ok){
    throw new Error("failed")
  }
  return res.json()
}

const LoginPage = async () => {
  const user:UserType[] = await getData();
  
  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center">
      {/* BOX */}
      <div className=" h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
        {/* IMAGE CONTAINER */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image src="/loginBg.png" alt="" fill className="object-cover" sizes="fill" priority={true}/>
        </div>
        {/* FORM CONTAINER */}
        <div className="p-6 flex flex-col gap-4 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-3xl">Welcome</h1>
          <p>Log into your account or create a new one using social buttons</p>
          <Login />
          <p className="text-sm">
            Have a problem?<Link className="underline" href="/"> Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
