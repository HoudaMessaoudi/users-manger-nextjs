"use client";
import React, { useState, useEffect } from "react";
import {handleStatusToggle} from '../actions/formActions'
import toast from "react-hot-toast"
const UserStatusSwitch = ({ user }) => {
  const [userStatus, setUserStatus] = useState({ status: user.status || "active" });
  useEffect(() => {
    user.status = userStatus.status;
  }, [userStatus]);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.checked ? "active" : "inactive";
    const response = await handleStatusToggle(user.id, newStatus);
    if(response?.error){
      toast.error(response.error); //hmm toast doesnt work here tho its a client component.. is it because the main app page is a server component?
    }else {
      setUserStatus({ status: newStatus }); // only update if the state is successfully updated on db
    }
  };
  return (
    <label className="switch flex">
      <input
        type="checkbox"
        className="toggle bg-white hover:bg-white border-none"
        style={{
          "--tglbg": userStatus.status === "active" ? "#104EE9" : "#BCCADC80",
          border: userStatus.status === "active" ? "#104EE9" : "border-[#627D98]",
        }}
        checked={userStatus.status === "active"}
        onChange={handleStatusChange}
      />
    </label>
  );
};

export default UserStatusSwitch;
