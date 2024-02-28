"use client"
import { z } from 'zod';
import DeleteButton from '@/components/Buttons/DeleteButton';
import { handleUserCreate, handleUserEdit } from "@/actions/formActions";
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

// Define a Zod schema for user data validation
const userSchema = z.object({
  firstName: z.string()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(255)
    .refine(value => /^[A-Za-z\s]+$/.test(value), {
      message: 'First name can only contain letters and spaces',
    }),
  lastName: z.string()
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(255)
    .refine(value => /^[A-Za-z\s]+$/.test(value), {
      message: 'Last name can only contain letters and spaces',
    }),
  email: z.string().email({ message: 'Invalid email address' }),
  role: z.string(),
});


const FormUser = ({ userData, isEditing, id }) => {

  // Function to clear error messages
  function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.text-red-600');
    errorElements.forEach((element) => element.remove());
    const inputElements = document.querySelectorAll('.input.error');
    inputElements.forEach((element) => element.classList.remove('error'));
  }

  // Client-side form submission handler (we call server actions inside)
  const clientAction = async (event) => {
    clearErrorMessages();  // Clear any existing error messages 

    const formData = {
      firstName: event.get('firstName'),
      lastName: event.get('lastName'),
      email: event.get('email'),
      role: event.get('role')
    };

    const result = userSchema.safeParse(formData); // Validate data with Zod schema ;D finally

    if (!result.success) {
      // Handle validation errors
      const errorMessages = {};
      result.error.issues.forEach((issue) => {
        errorMessages[issue.path[0]] = issue.message;
      });

      // Display error messages for invalid fields
      for (const [field, message] of Object.entries(errorMessages)) {
        const input = document.getElementById(field); //retrieve input by id 
        if (input) {
          const errorMessageElement = document.createElement('span');
          errorMessageElement.classList.add('text-red-600');
          errorMessageElement.textContent = message;
          input.parentNode.insertBefore(errorMessageElement, input.nextSibling);
        }
      }
    } else {
      // Handle successful validation
      const submitted = isEditing ? await handleUserEdit(result.data, isEditing, id) : await handleUserCreate(result.data);
      if (submitted?.success) {
        toast.success(submitted.success);
      } else {
        toast.error(submitted.error);
      }
    }
  };

  return (
    <form className="m-4" action={clientAction}>
      <label className="form-control w-full">
        <div className="label pb-1">
          <span className="label-text">First Name</span>
        </div>
        <input
          id ="firstName"
          name="firstName"
          type="text"
          defaultValue={isEditing ? userData.firstName : ''} //prefill input in editing case
          placeholder="John"
          className="input input-bordered w-full rounded-sm h-8"
        />
        {/* Display Zod validation error*/}
        <span id="firstName-zod-error" className="text-red-600" />  
      </label>

      <label className="form-control w-full">
        <div className="label pb-1">
          <span className="label-text">Last name</span>
        </div>
        <input
          id = 'lastName'
          name = 'lastName'
          type="text"
          defaultValue={isEditing ? userData.lastName : ''} //prefill input in editing case
          placeholder="Doe"
          className="input input-bordered w-full rounded-sm h-8"
          
        />
        {/* Display Zod validation error */}
        <span id="lastName-zod-error" className="text-red-600" />
      </label>

      <label className="form-control w-full">
        <div className="label pb-1">
          <span className="label-text">Email</span>
        </div>
        <input
          id= "email"
          name ="email"
          type="email"
          defaultValue={isEditing ? userData.email : ''} //prefill input in editing case
          placeholder="john.doe@gmail.com"
          className="input input-bordered w-full rounded-sm h-8"
        />
        {/* Display Zod validation error*/}
        <span id="email-zod-error" className="text-red-600" />
      </label>

      <label className="form-control w-full mt-2">
        <span className="label-text pb-1">Role</span>
        <select
          id="role"
          name="role"
          defaultValue={isEditing ? userData.role.slug : ''} //prefill input in editing case
          className="select select-bordered w-full rounded-sm h-8"
        >
          <option className="rounded-sm h-8" value="admin">
            Admin
          </option>
          <option className="rounded-sm h-8" value="account_manager">
            Account manager
          </option>
          <option className="rounded-sm h-8" value="operations">
            Operations
          </option>
          <option className="rounded-sm h-8" value="product">
            Product
          </option>
        </select>
      </label>

      {isEditing && (
        <div>
          <h1 className="h-5 m-2 pb-8 border-b border-gray-400">Danger zone</h1>
          {userData.id && <DeleteButton id={userData.id} />}
        </div>
      )}

      <div className="flex justify-end">
        <button type="submit" className="bg-blue-700 text-white w-16 h-7 mt-20 rounded-sm">
          Save
        </button>
      </div>
    </form>
  );
};

export default FormUser;
