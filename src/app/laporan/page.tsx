"use client"
import { CartItemType, OrderType } from '@/types/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, {useState, useEffect} from 'react'

const Laporan = () => {
  const [JenisLaporanA, setJenisLaporanA] = useState("laporanPenjualan")
  const [Bulan, setBulan] = useState("1")
  const [Tahun, setTahun] = useState("2020")
  const [JLisSelected, setJLisSelected] = useState([
  {
    name: "laporanPenjualan",
    selected: false
  }, {
    name: "laporanProdukTerlaris",
    selected: false
  }, {
    name: "laporanCatTerlaris",
    selected: false
  },{
    name: "laporanProduk",
    selected: false
  },
  ]);
  const [bulanisSelected, setBulanisSelected] = useState([
  {
    name: "1",
    selected: false
  }, {
    name: "2",
    selected: false
  },
  {
    name: "3",
    selected: false
  }, {
    name: "4",
    selected: false
  },
  {
    name: "5",
    selected: false
  }, {
    name: "6",
    selected: false
  },
  {
    name: "7",
    selected: false
  }, {
    name: "8",
    selected: false
  },
  {
    name: "9",
    selected: false
  }, {
    name: "10",
    selected: false
  },
  {
    name: "11",
    selected: false
  }, {
    name: "12",
    selected: false
  },
  ]);
  const [tahunisSelected, setTahunisSelected] = useState([
  {
    name: "2020",
    selected: false
  }, {
    name: "2021",
    selected: false
  },
  {
    name: "2022",
    selected: false
  }, {
    name: "2023",
    selected: false
  },
  ]);
  const [showBulanTahun, setShowBulanTahun] = useState(true);

  const router = useRouter()

  const JLHandler = (nama:string) => {
    const nextJSisSelected = JLisSelected.map(e => {
      if(e.name == nama){
        e.selected = true
        return e
      } else {
        e.selected = false
        return e
      }
    })
    if(nama == "laporanProduk"){
      setShowBulanTahun(false)
    } else{
      setShowBulanTahun(true)
    }
    setJenisLaporanA(nama)
    setJLisSelected(nextJSisSelected)
  }
  const bulanHandler = (nama:string) => {
    const nextbulanIsSelected = bulanisSelected.map(e => {
      if(e.name == nama){
        e.selected = true
        return e
      } else {
        e.selected = false
        return e
      }
    })
    setBulan(nama)
    setBulanisSelected(nextbulanIsSelected)
  }
  const tahunHandler = (nama:string) => {
    const nexttahunIsSelected = tahunisSelected.map(e => {
      if(e.name == nama){
        e.selected = true
        return e
      } else {
        e.selected = false
        return e
      }
    })
    setTahun(nama)
    setTahunisSelected(nexttahunIsSelected)
  }

  const buttonHandler = () => {
    if(JenisLaporanA == "laporanPenjualan"){
      router.push(`/laporanPenjualan/${Tahun}-${Bulan}`)
    } else if(JenisLaporanA == "laporanProdukTerlaris"){
      router.push(`/laporanProdukTerlaris/${Tahun}-${Bulan}`)
    } else if(JenisLaporanA == "laporanProduk"){
      router.push(`/laporanProduk`)
    }
  }
  
  return (
    <div className='px-2 py-2 md:px-40 md:py-4' >
      <h1 className='text-4xl text-center mb-5 text-red-500' >Pilih Laporan</h1>
      <div className='flex flex-col md:flex-row rounded-md p-2 gap-14 ' >
        <div className='w-full'>
          <h2 className=' font-bold text-2xl' >Jenis Laporan</h2>
          <div className="flex flex-col gap-3 mt-4">
            <label className="cursor-pointer" onClick={() => JLHandler("laporanPenjualan")} >
              <input type="radio" className="peer sr-only" name="pricing" />
              <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${JLisSelected[0].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""} `}>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase text-gray-500">Laporan Penjualan</p>
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </label>
            <label className="cursor-pointer" onClick={() => JLHandler("laporanProdukTerlaris")} >
              <input type="radio" className="peer sr-only" name="pricing" />
              <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${JLisSelected[1].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""}`}>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase text-gray-500">Laporan Produk Terlaris</p>
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </label>
            <label className="cursor-pointer" onClick={() => JLHandler("laporanCatTerlaris")} >
              <input type="radio" className="peer sr-only" name="pricing" />
              <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${JLisSelected[2].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""}`}>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase text-gray-500">Laporan Category Terlaris</p>
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </label>
            <label className="cursor-pointer" onClick={() => JLHandler("laporanProduk")} >
              <input type="radio" className="peer sr-only" name="pricing" />
              <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${JLisSelected[3].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""}`}>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase text-gray-500">Laporan Produk</p>
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
        {showBulanTahun ? (
          <div className='w-full'>
            <h2 className=' font-bold text-2xl' >Pilih Bulan</h2>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <label className="cursor-pointer" onClick={() => bulanHandler("1")} >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${bulanisSelected[0].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""}`}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase text-gray-500">Jan</p>
                      <div>
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
              <label className="cursor-pointer" onClick={() => bulanHandler("2")} >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${bulanisSelected[1].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""}`}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase text-gray-500">Feb</p>
                      <div>
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
              <label className="cursor-pointer" onClick={() => bulanHandler("3")} >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${bulanisSelected[2].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""}`}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase text-gray-500">Mar</p>
                      <div>
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
              <label className="cursor-pointer" onClick={() => bulanHandler("4")} >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${bulanisSelected[3].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""}`}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase text-gray-500">Apr</p>
                      <div>
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
              <label className="cursor-pointer" onClick={() => bulanHandler("5")} >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${bulanisSelected[4].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""}`}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase text-gray-500">May</p>
                      <div>
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
              <label className="cursor-pointer" onClick={() => bulanHandler("6")} >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${bulanisSelected[5].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""}`}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase text-gray-500">Jun</p>
                      <div>
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
              <label className="cursor-pointer" onClick={() => bulanHandler("7")} >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${bulanisSelected[6].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""}`}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase text-gray-500">Jul</p>
                      <div>
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
              <label className="cursor-pointer" onClick={() => bulanHandler("8")} >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${bulanisSelected[7].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""}`}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase text-gray-500">Aug</p>
                      <div>
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
              <label className="cursor-pointer" onClick={() => bulanHandler("9")} >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${bulanisSelected[8].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""}`}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase text-gray-500">Sep</p>
                      <div>
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
              <label className="cursor-pointer" onClick={() => bulanHandler("10")} >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${bulanisSelected[9].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""}`}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase text-gray-500">Oct</p>
                      <div>
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
              <label className="cursor-pointer" onClick={() => bulanHandler("11")} >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${bulanisSelected[10].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""}`}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase text-gray-500">Nov</p>
                      <div>
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
              <label className="cursor-pointer" onClick={() => bulanHandler("12")} >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${bulanisSelected[11].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""}`}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase text-gray-500">Dec</p>
                      <div>
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        ): <div className='w-full'></div> }
        {showBulanTahun ? (
          <div className='w-full'>
            <h2 className=' font-bold text-2xl'>Tahun</h2>
            <div className="flex flex-col gap-3 mt-4">
              <label className="cursor-pointer" onClick={() => tahunHandler("2020")} >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${tahunisSelected[0].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""} `}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase text-gray-500">2020</p>
                      <div>
                        <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
              <label className="cursor-pointer" onClick={() => tahunHandler("2021")} >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${tahunisSelected[1].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""}`}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase text-gray-500">2021</p>
                      <div>
                        <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
              <label className="cursor-pointer" onClick={() => tahunHandler("2022")} >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${tahunisSelected[2].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""} `}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase text-gray-500">2022</p>
                      <div>
                        <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
              <label className="cursor-pointer" onClick={() => tahunHandler("2023")} >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div className={`w-full rounded-md bg-white p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${tahunisSelected[3].selected == true ? "text-red-300 ring-red-500 ring-offset-2" : ""}`}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase text-gray-500">2023</p>
                      <div>
                        <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        ): <div className='w-full'></div> }
      </div>
      <div className='w-full text-right pt-8'>
        <button className=' bg-red-500 rounded-md py-2 px-4 hover:bg-red-700' type='button' onClick={buttonHandler} >Terapkan</button>
      </div>
    </div>
  )
}

export default Laporan

/*
<div>
          <h2>Bulan</h2>
          <select name="Bulan" id="Bulan" onChange={bulanHandler} >
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">Mei</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Aug</option>
            <option value="9">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </select>
        </div>
*/

/*
"use client"
import { CartItemType, OrderType } from '@/types/types'
import Link from 'next/link'
import React, {useState} from 'react'

const Laporan = () => {
  const [JenisLaporanA, setJenisLaporanA] = useState("laporanPenjualan")
  const [Bulan, setBulan] = useState("1")
  const [Tahun, setTahun] = useState("2020")
  const [data, setData] = useState<OrderType[]>();
  const [LP, setLP] = useState(false);
  const [LPT, setLPT] = useState(false);
  const [totalPrices, setTotalPrices] = useState(0);

  const jenisLaporanOnChangeHandler = (e:React.ChangeEvent<HTMLSelectElement>) =>{
    setJenisLaporanA(e.target.value)
  }
  const bulanHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setBulan(e.target.value)
  }
  const tahunHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setTahun(e.target.value)
  }

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
      setLP(true)
      setLPT(false)
    })
  }
  const LPTHandler = async () => {
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
      // console.log(filterArray)
      setLPT(true)
      setLP(false)
    })
  }

  const buttonHandler = () => {
    if(JenisLaporanA == "laporanPenjualan"){
      LPHandler()
    } else{
      LPTHandler()
    }
    
  }
  
  return (
    <div className='px-12 py-4' >
      <h1>Laporan</h1>
      <div className='flex justify-between bg-gray-200 rounded-md p-2 ' >
        <div>
          <h2 className='font-semibold text-lg mb-5' >Jenis Laporan</h2>
          <select name="JenisLaporan" id="JenisLaporan" onChange={jenisLaporanOnChangeHandler} >
            <option value="laporanPenjualan">Laporan Penjualan</option>
            <option value="laporanProdukTerlaris">Laporan Produk Terlaris</option>
            <option value="laporanKatalogProduk">Laporan Katalog Produk</option>
          </select>
        </div>
        <div>
          <h2>Bulan</h2>
          <select name="Bulan" id="Bulan" onChange={bulanHandler} >
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">Mei</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Aug</option>
            <option value="9">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </select>
        </div>
        <div>
          <h2>Tahun</h2>
          <select name="Tahun" id="Tahun" onChange={tahunHandler} >
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div>
          <button type='button' onClick={buttonHandler} >Terapkan</button>
        </div>
      </div>
      <div>
        {LP ? (
          <div className="p-4 flex flex-col lg:px-20 xl:px-40">
            <div>
              <h2>Laporan Penjualan</h2>
              <h2>Sutet Coffee</h2>
              <h2>Periode {Bulan} - {Tahun}</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border border-solid border-l-0 border-r-0">
                  <th>Id</th>
                  <th>Date</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {data && data.map((item: OrderType) => {
                  for (let indexs = 0; indexs < item.products.length; indexs++) {
                      if(item.status == "Done"){
                          return(
                              item.products.map((e, index) => {
                                if(item.createdAt.toString().slice(0,10).split("-")[1] == Bulan && item.createdAt.toString().slice(0,10).split("-")[0] == Tahun){
                                  return (
                                    <tr className={`bg-gray-50`} key={item.id + index.toString()}>
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
            <div className="w-full flex border border-solid border-l-0 border-r-0 " >
              <div className="flex-1" >Total Revenue</div>
              <div className="flex-3">${totalPrices}</div>
            </div>   
          </div>
        )
        :
          (
            <div></div>
          )
        }
      </div>
    </div>
  )
}

export default Laporan
*/