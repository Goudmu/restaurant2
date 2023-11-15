"use client"

import { useSession } from "next-auth/react"
import Link from "next/link";


const LaporanNavbar = () => {
    const session = useSession();
    if(session.data?.user.isAdmin){
        return (
            <Link href="/laporan" >Laporan</Link>
        )
    }
}

export default LaporanNavbar