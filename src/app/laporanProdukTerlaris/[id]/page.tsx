"use client";

import { OrderType, ProductTypeLaporan } from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import React, {useEffect, useState} from "react";

type thisProduct = { 
  id: string,
  name: string,
  price: number,
  qty: number
}

const Laporan = () => {
  const [data, setData] = useState<OrderType[]>();
  const [listProduct, setListProduct] = useState<ProductTypeLaporan[]>()
  const [thisProduct, setthisProduct] = useState<thisProduct[]>()
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
    let nextlistProductId:ProductTypeLaporan[] = [];
    let datas:OrderType[] = [];
    let thisdatas:thisProduct[] = [];
    
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
      datas = dataLP
      setTotalPrices(totalPrice)
      setData(dataLP)
    })
    await fetch("http://localhost:3000/api/productLaporan", {
      cache: "no-store"
    }).then(res => res.json())
    .then((dataLP:ProductTypeLaporan[]) => {
      dataLP.map(e => {
        nextlistProductId.push(e)
      })
      setListProduct(nextlistProductId)
    })
    datas.map(e => {
      if(e.status == "Done"){
        e.products.map(f => {
          nextlistProductId.map(g => {
            if(g.id == f.id){
              if(thisdatas.length == 0){
                thisdatas.push({
                  id: g.id,
                  name: g.title,
                  price: g.price,
                  qty: f.quantity
                })
              } else {
                let exisst = false;
                for (let index = 0; index < thisdatas.length; index++) {
                  if(thisdatas[index].id == g.id){
                    thisdatas[index].qty += f.quantity
                    exisst = true
                  }
                }
                if(!exisst){
                  thisdatas.push({
                    id: g.id,
                    name: g.title,
                    price: g.price,
                    qty: f.quantity
                  })
                }
              }
            }
          })
        })
      }
    })
    thisdatas.sort((a,b) => b.qty - a.qty)
    setthisProduct(thisdatas)
  }

  return (
    <div className="p-4 flex flex-col lg:px-20 xl:px-40">
      <div className="border border-red-700 rounded-md" >
        <table className="w-full">
          <thead className="border border-red-700 border-t-0 border-x-0" >
            <tr>
              <th>Id</th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total Revenue</th>
            </tr>
          </thead>
          <tbody >
            {thisProduct && thisProduct.map((item: thisProduct) => {
              return(
                <tr key={item.id}>
                  <td className="py-2 px-1">{item.id}</td>
                  <td className="py-2 px-1">
                      {item.name}
                  </td>
                  <td className="py-2 px-1">
                      ${item.price}
                  </td>
                  <td className="py-2 px-1">
                      {item.qty}
                  </td>
                  <td className="py-2 px-1 text-right">
                      ${item.price * item.qty}
                  </td>
              </tr>
              )
            })}
          </tbody>
        </table>
        {/* <div className="w-full flex border border-red-700 border-b-0 border-x-0 p-1 " >
          <div className="flex-1" >Total Revenue</div>
          <div className="flex-3">${totalPrices}</div>
        </div> */}
      </div>
    </div>
  );
};

export default Laporan;