import React from 'react'
import Link from 'next/link';
function AddButton() {
  return (
    <Link href={"/createUser"}>
            <button className="border-transparent text-[#104EE9]">+ Add</button>
    </Link>
  )
}

export default AddButton
