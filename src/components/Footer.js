import React from 'react'
import LockIcon from './icons/LockIcon'
function Footer() {
  return (
    <div>
      <footer className="footer footer-center p-2 pt-4 bg-white text-base-content border-t border-gray-300">
        <aside>
            <div className="relative flex items-center justify-center">
                <div className="flex mb-5">
                    <LockIcon/>
                    <h1 >  admin.feefty.com</h1>
                </div>
            <div className="bg-black h-1.5 w-36 rounded-full absolute bottom-0"></div>
        </div>
        </aside>
     </footer>
    </div>
  )
}

export default Footer
