"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import {handleUserDelete} from '../../actions/formActions'
import toast from 'react-hot-toast'

function DeleteButton({ id }) { 
  const router = useRouter()
  const handleDelete = async (event) => {
    event.preventDefault(); // prevent the form from submitting 
    const result = await handleUserDelete(id);
    if(result?.success){
      router.push('/');
    }else{
      toast.error(result.error);
    }
};
  return (
    <div>
      <button
        className="rounded-sm border border-red-500 text-white bg-red-500 w-16 h-7 mt-2"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('confirmationBox').showModal();
          
        }}>Delete</button>


      <dialog id="confirmationBox" className="modal">
        <div className="modal-box bg-white drop-shadow-lg p-4 rounded-none">
          <h3 className="font-bold text-lg">Are you absolutely sure?</h3>
            <p className="py-4">This action cannot be undone. This will permanently 
            delete the user</p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="rounded-sm border border-blue-700 text-blue-700 bg-white w-16 h-7">Cancel</button>
                  <button className="rounded-sm border border-red-500 text-white bg-red-500 w-16 h-7 ml-2" onClick={handleDelete}>Delete</button>
                </form>
              </div>
        </div>
      </dialog>
    </div>
  );
}

export default DeleteButton;
