"use client";

import { OrderType, OrderTypeForOrder, UserType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState , useEffect } from "react";
import { toast } from "react-toastify";

let statusOrders = ""
let users:UserType[];
let thisuser:UserType;

const OrdersPage = () => {
  const [statusOrder, setStatusOrder] = useState("");
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["order"],
    queryFn: () =>
      fetch("http://localhost:3000/api/order").then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`http://localhost:3000/api/order/${id}`, {
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLSelectElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLSelectElement;
    // const input = form.elements[0] as HTMLInputElement;
    const status = form.value

    mutation.mutate({ id, status });
    toast.success("The order status has been changed!")
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/api/user", {
        cache: "no-store"
      })
    
      if(!res.ok){
        throw new Error("failed")
      }
      await res.json().then(res => {
        users = res;
        users.map(e => {
          if(e.username == session?.user.email){
            thisuser = e;
          }
        })
      })
    }
    getData()
  },[thisuser])

  if (isLoading || status === "loading") return "Loading...";
  if (session?.user.isAdmin){
    return (
      <div className="p-5 h-screen bg-gray-100" >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {
            data.map((item: OrderType) => (
              <div className="bg-white space-y-3 p-4 rounded-md shadow" key={item.id}>
                <div className="flex items-center space-x-2 text-sm" >
                  <div className="text-blue-500 font-bold">{item.id}</div>
                  <div className="text-gray-500" >{item.createdAt.toString().slice(0,10)}</div>
                  <div className={`p-2 text-xs font-medium uppercase 
                  ${item.status == "Done" ? "tracking-widertext-green-800 bg bg-green-200":
                  item.status == "On Going..." ? "tracking-widertext-yellow-800 bg bg-yellow-200"
                  : "tracking-widertext-red-800 bg bg-red-200"
                  } rounded-lg bg-opacity-30`}>{item.status}</div>
                  <div className="flex flex-row">
                    <div>Change Status ?</div>
                    <select name="changeStatus" id="changeStatus" onChange={e => 
                    {
                      statusOrders = e.target.value
                      handleUpdate(e, item.id)
                      }} >
                      <option value="" hidden>Select New Status</option>
                      <option value="Done">Done</option>
                      <option value="On Going...">On Going...</option>
                      <option value="Cancel">Cancel</option>
                    </select>
                  </div>
                </div>
                {
                  item.products.map((e, index) => {
                    if(item.products.length == 1){
                      return(
                        <div className="text-sm text-gray-700" key={e.id} >{e.title}</div>
                      )
                    } else {
                      let name = "";
                      for (let indexs = 0; indexs < item.products.length; indexs++) {
                        if(indexs == item.products.length - 1){
                          name += item.products[indexs].title
                        } else{
                          name += item.products[indexs].title + ", "
                        }
                      }
                      if (index == item.products.length - 1) {
                        return(
                          <div className="text-sm text-gray-700" key={e.id} >{name}</div>
                        )
                      }
                    }
                  })
                }
                <div className="text-sm font-medium text-black" >Total Price : ${item.price}</div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }

  if (session?.user.isAdmin == false && thisuser != undefined){
    console.log(session)
    console.log(thisuser)
    return (
      <div className="p-5 h-screen bg-gray-100" >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {
            data.map((item: OrderTypeForOrder) => {
              if(item.usernameUser == thisuser.username){
                return(
                  <div className="bg-white space-y-3 p-4 rounded-md shadow" key={item.id}>
                    <div className="flex items-center space-x-2 text-sm" >
                      <div className="text-blue-500 font-bold">{item.id}</div>
                      <div className="text-gray-500" >{item.createdAt.toString().slice(0,10)}</div>
                      <div className={`p-2 text-xs font-medium uppercase 
                      ${item.status == "Done" ? "tracking-widertext-green-800 bg bg-green-200":
                      item.status == "On Going..." ? "tracking-widertext-yellow-800 bg bg-yellow-200"
                      : "tracking-widertext-red-800 bg bg-red-200"
                      } rounded-lg bg-opacity-30`}>{item.status}</div>
                    </div>
                    {
                      item.products.map((e, index) => {
                        if(item.products.length == 1){
                          return(
                            <div className="text-sm text-gray-700" key={e.id} >{e.title}</div>
                          )
                        } else {
                          let name = "";
                          for (let indexs = 0; indexs < item.products.length; indexs++) {
                            if(indexs == item.products.length - 1){
                              name += item.products[indexs].title
                            } else{
                              name += item.products[indexs].title + ", "
                            }
                          }
                          if (index == item.products.length - 1) {
                            return(
                              <div className="text-sm text-gray-700" key={e.id} >{name}</div>
                            )
                          }
                        }
                      })
                    }
                    <div className="text-sm font-medium text-black" >Total Price : ${item.price}</div>
                  </div>
                )
              }}
            )
          }
        </div>
      </div>
    )
  }
};

export default OrdersPage;

/*
"use client";

import { OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["order"],
    queryFn: () =>
      fetch("http://localhost:3000/api/order").then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`http://localhost:3000/api/order/${id}`, {
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;

    mutation.mutate({ id, status });
    toast.success("The order status has been changed!")
  };

  if (isLoading || status === "loading") return "Loading...";

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: OrderType) => (
            <tr className={`${item.status !== "delivered" && "bg-red-50"}`} key={item.id}>
              <td className="hidden md:block py-6 px-1">{item.id}</td>
              <td className="py-6 px-1">
                {item.createdAt.toString().slice(0, 10)}
              </td>
              <td className="py-6 px-1">{item.price}</td>
              {
                item.products.map((e, index) => (
                <td className="hidden md:block py-6 px-1" key={index}>
                  {e.title}
                </td>
                ))
              }
              {session?.user.isAdmin ? (
                <td>
                  <form
                    className="flex items-center justify-center gap-4"
                    onSubmit={(e) => handleUpdate(e, item.id)}
                  >
                    <input
                      placeholder={item.status}
                      className="p-2 ring-1 ring-red-100 rounded-md"
                    />
                    <button className="bg-red-400 p-2 rounded-full">
                      <Image src="/edit.png" alt="" width={20} height={20} />
                    </button>
                  </form>
                </td>
              ) : (
                <td className="py-6 px-1">{item.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
*/