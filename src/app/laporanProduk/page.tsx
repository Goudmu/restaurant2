"use client";

import { ProductType } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {useEffect, useState} from "react";

const laporanProduk = () => {
  const [data, setData] = useState<ProductType[]>();
  const router = useRouter()

  useEffect(()=> {
    dataHandler()
  },[])

  const dataHandler = async () => {
    let newData:ProductType[] = [];
    await fetch("http://localhost:3000/api/productLaporan", {
        cache: "no-store"
    }).then(res => res.json())
    .then((data:ProductType[]) => {
        newData = data
    })
    console.log(newData)
    setData(newData)
  }

  const deleteProduct = async(id:string) => {
    const res = await fetch("http://localhost:3000/api/UDProducts", {
    method: "DELETE",
    body: JSON.stringify({
      id: id
    })})
    if(res.ok){
      dataHandler()
    } else{
      console.log("Something went wrong!")
    }
  }

  return (
    <div className="p-4 flex flex-col lg:px-20 xl:px-40">
      <div className="border border-red-700 rounded-md" >
        <table className="w-full">
          <thead className="border border-red-700 border-t-0 border-x-0" >
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th className="hidden md:block " >Desc</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item: ProductType) => {
              return(
                <tr key={item.id}>
                  <td className="py-2 px-1">
                    <div>
                        <button type="button" className="pr-2" onClick={() => {
                            router.push(`/ProductEdit/${item.id}`)
                        }} >
                            <Image src="/edit2.png" alt="" width={20} height={20}></Image>
                        </button>
                        <button type="button" className="pr-2" onClick={()=> deleteProduct(`${item.id}`)} >
                            <Image src="/close.png" alt="" width={20} height={20}></Image>
                        </button>
                        <span>{item.id}</span>
                    </div> 
                  </td>
                  <td className="py-2 px-1">
                      {item.title}
                  </td>
                  <td className="py-2 px-1 hidden md:block ">
                      {item.desc}
                  </td>
                  <td className="py-2 px-1 text-center">
                      ${item.price}
                  </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default laporanProduk;