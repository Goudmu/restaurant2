"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useEdgeStore } from "../../lib/edgestore";
import { toast } from "react-toastify";

let links = "";

type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

type Option = {
  title: string;
  additionalPrice: number;
};
type editProductType = {
  id: string;
  title: string;
  desc?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
  catSlug: string;
  isFeatured: boolean
}

const EditProductPage = () => {
  const { data: session, status } = useSession();
  const [dataProduct, setDataProduct] = useState<editProductType>({
    id: "",
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
    isFeatured: false,
  })
  const params = useParams()

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();
  const {edgestore} = useEdgeStore();

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  }

  useEffect(() => {
    takeDataHandler()
  },[])

  const takeDataHandler =async () => {
    await fetch(`http://localhost:3000/api/productPerId?cat=${params.id}`,{
      cache: "no-store"
    }).then(res => res.json())
    .then(data => {
      setDataProduct(data)
    })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDataProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  };

  const uploadImage = async () => {
    if(file) {
      await edgestore.myPublicImages.upload({file}).then((res) => {
        links = res.url;
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await uploadImage().then(async () => {
        const res = await fetch("http://localhost:3000/api/UDProducts", {
          method: "POST",
          body: JSON.stringify({
            ...dataProduct,
            img: links,
            options,
          }),
        });
        const data = await res.json();
        links ="";
        toast.success("The product edited successfully")
        router.push(`/laporanProduk`);
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[100vh+3rem] md:h-[calc(100vh+5rem)] flex items-center justify-center text-red-500">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
        <h1 className="text-4xl mb-2 text-gray-300 font-bold">
          Edit Product
        </h1>
        <div className="w-full flex flex-col gap-2 ">
          <label
            className="text-sm cursor-pointer flex gap-4 items-center"
            htmlFor="file"
          >
            <Image src="/upload.png" alt="" width={30} height={20} />
            <span>Upload Image</span>
          </label>
          <input
            type="file"
            onChange={handleChangeImg}
            id="file"
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Title</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="text"
            value={`${dataProduct?.title}`}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Description</label>
          <textarea
            rows={3}
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            value={`${dataProduct?.desc}`}
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Price</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="number"
            value={`${dataProduct?.price}`}
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Category</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="text"
            value={`${dataProduct?.catSlug}`}
            name="catSlug"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;