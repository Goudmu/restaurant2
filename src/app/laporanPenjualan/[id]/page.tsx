"use client";

import { OrderType } from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import React, {useEffect, useState} from "react";

const Laporan = () => {
  const [data, setData] = useState<OrderType[]>();
  const [Bulan, setBulan] = useState("1")
  const [Tahun, setTahun] = useState("2020")
  const [totalPrices, setTotalPrices] = useState(0);

  const params = useParams()

  useEffect(()=> {
    LPHandler()
  },[])

  useEffect(() => {
    setBulan(params.id.toString().split("-")[1])
    setTahun(params.id.toString().split("-")[0])
    LPHandler()
  },[Bulan, Tahun])

  const LPHandler = async () => {
    let totalPrice = 0;
    await fetch("http://localhost:3000/api/order", {
      cache: "no-store"
    }).then(res => res.json())
    .then((dataLP:OrderType[]) => {
      dataLP.map(e => {
        e.products.map(f => {
          if(e.status == "Done"){
            if(e.createdAt.toString().slice(0,10).split("-")[1] == Bulan && e.createdAt.toString().slice(0,10).split("-")[0] == Tahun){
              totalPrice += f.price * f.quantity
            }
          }
        })
      })
      setTotalPrices(totalPrice)
      setData(dataLP)
    })
  }

  return (
    <div className="p-4 flex flex-col lg:px-20 xl:px-40">
      <div className="border border-red-700 rounded-md" >
        <table className="w-full">
          <thead className="border border-red-700 border-t-0 border-x-0" >
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody >
            {data && data.map((item: OrderType) => {
              for (let indexs = 0; indexs < item.products.length; indexs++) {
                  if(item.status == "Done"){
                      return(
                          item.products.map((e, index) => {
                            if(item.createdAt.toString().slice(0,10).split("-")[1] == Bulan && item.createdAt.toString().slice(0,10).split("-")[0] == Tahun){
                              return (
                                <tr className={`${item.status == "lunas" && "bg-red-50"}`} key={item.id + index.toString()}>
                                    <td className="py-2 px-1">{item.id}</td>
                                    <td className="py-2 px-1">
                                        {item.createdAt.toString().slice(0, 10)}
                                    </td>
                                    <td className="py-2 px-1">
                                        {e.title}
                                    </td>
                                    <td className="py-2 px-1">
                                        ${e.price}
                                    </td>
                                    <td className="py-2 px-1">
                                        {e.quantity}
                                    </td>
                                    <td className="py-2 px-1 text-right">
                                        ${e.price * e.quantity}
                                    </td>
                                </tr>
                              ) 
                            }
                          })
                      )
                  }
              }
            })}
          </tbody>
        </table>
        <div className="w-full flex border border-red-700 border-b-0 border-x-0 p-1 " >
          <div className="flex-1" >Total Revenue</div>
          <div className="flex-3">${totalPrices}</div>
        </div>
      </div>
    </div>
  );
};

export default Laporan;