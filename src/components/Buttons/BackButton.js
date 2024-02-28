"use client"
import React from 'react'

import { useRouter } from 'next/navigation';
function BackButton() {
    const router = useRouter();
  return (
    <div>

         <button className="border-transparent text-[#104EE9]"
                onClick={() =>router.back()}>&lt; Back</button>

    </div>
  )
}

export default BackButton
