"use client"
import React from 'react';
import FormUser from "@/components/FormUser";
import BackButton from '@/components/Buttons/BackButton';
import { useRouter } from 'next/navigation'; 
import Footer from '@/components/Footer';
import Navbr from '@/components/Navbr';
import {Toaster} from 'react-hot-toast';
import {Text} from '@radix-ui/themes'

const createPage = () => {
  const router = useRouter(); 
  return (
    <div>
      <Navbr/>
      <BackButton />
      <div className="bg-white drop-shadow-lg p-4">
      <Text size="3" weight="medium">Create A New User</Text>
        <div>
          {/* Render the user creation form */}
          <FormUser isEditing={false} />
        </div>
      </div>
      <Footer/>
      {/* Toast notifications for displaying success or error messages */}
      <Toaster position="bottom-center"/>
    </div>
  );
}

export default createPage;
