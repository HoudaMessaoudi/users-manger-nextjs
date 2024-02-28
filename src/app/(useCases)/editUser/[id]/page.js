import FormUser from '@/components/FormUser';
import BackButton from '@/components/Buttons/BackButton';
import {Text} from '@radix-ui/themes'
import Footer from '@/components/Footer';
import Navbr from '@/components/Navbr';
import {Toaster} from 'react-hot-toast';
import { getUser } from '@/actions/formActions';
const EditUserPage =  async ({params}) => {
  const  id  = params.id; // Destructure id from the URL

  const userData = await getUser(id);
  return (
    <div>
      <Navbr/>
      <BackButton />
      <div className="bg-white drop-shadow-lg p-4 h-180">
        {userData && <Text size="3" weight="medium">Edit {userData.firstName} {userData.lastName}</Text>}
        {/* Only render FormUser if userData is not null */}
        {userData && <FormUser userData={userData} isEditing={true} id= {id} />}
      </div>
      <Footer/>
      <Toaster position="bottom-center"/>
    </div>
  );
};

export default EditUserPage;
