import Image from "next/image";
import "@styles/Navbar.css";
import Link from 'next/link'
import Dropdown from "./Dropdown";
import { ArrowDown2 } from "iconsax-react";
import { useSelector } from "react-redux";
import { getFullName, getFirstLetter} from "@utils/dataManipulation"
import { uploadsList } from "@utils/uploadsData"




const Navbar = () => {
  const {user } = useSelector(state=> state.auth)
  

    const items = ["Minimum Due", "Trans File", "Credit Payment", "Resend File"]
  return (
    <div>
      <header className="bg-white border-b border-neutral-900 border-opacity-20">
        <section className="max-w-7xl mx-auto  flex justify-between">
          <div className="flex justify-center space-x-10 items-center">
            <div className=" py-2">
            <Image
              src="/assets/fcmblogo2.png"
              alt="fcmb_logo"
              width={55}
              height={50}
            />
            </div>
           

            <div className=" space-x-10 text-zinc-800 text-base font-semibold leading-normal">
              <Link href="/" className="box-border h-full border-b-solid border-b-[5px] border-b-purple-800 pb-5 ">Dashboard</Link>
              <Dropdown display="Branch" items={uploadsList} />
              <Link href="/dashboard/profilemgt" className=" pb-5 ">Profile Mgt.</Link>

            </div>
          </div>

          <div className="flex space-x-4 items-center">
            <div className="bg-purple-800 rounded-full h-12 w-12 p-2 grid place-content-center">
                <h1 className=" text-lg font-semibold text-white">
                {getFirstLetter(user?.staff)}
                </h1>

            </div>
           

            <div className=" space-x-10 text-zinc-800 text-base font-light leading-normal">
              <Link href="/other" className="border-b-purple-800">
                {getFullName(user?.staff)}
                <ArrowDown2 className="inline ml-4" size="22" color="#292D32" variant="Bold" />
              </Link>
            </div>
          </div>
        </section>
      </header>
    </div>
  );
};

export default Navbar;
