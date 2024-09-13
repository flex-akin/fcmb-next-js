"use client"

import "@styles/Dashboard.css";
import Card from "@components/Card";
import Ellipse from "@components/Ellipse";
import { Speedometer, ReceiveSquare, TransactionMinus, TransmitSquare } from "iconsax-react";
import { getFirstLetter, getFirstNAme, getFullName } from "@utils/dataManipulation";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import Loader from "@components/Loader";


const Dashboard = () => {
  
  const {user, loading } = useSelector((state) => state.auth)
  return (
<Fragment>
  
    {loading ? <Loader /> :  ( user && <>
    <div>
        <div className="min-w-[70%] flex items-center mt-4 mb-10">
          <h1 className="text-2xl font-bold text-zinc-700">Welcome, {getFirstNAme(user.staff)}</h1>
        </div>
        <div className="flex flex-row space-x-10">
          <div className="basis-[70%] min-h-fit space-y-10">
            <div className="bg-amber-50 h-fit">
              <div className="flex flex-row">
                <div className="m-5 ">
                  <h1 className="text-xl font-semibold mt-3 text-zinc-800">
                    Begin with Mastercard
                  </h1>
                  <p className="font-light text-md leading-snug my-5">
                    Start your day right by navigating through Mastercard system
                    for your work. Have a productive day
                  </p>
                  <button className="rounded-md bg-purple-800 text-white text-[12px] px-5 py-2 my-3">
                    Get Started
                  </button>
                </div>
                <div className="h-fit w-fit">
                  <img
                    src="/assets/dashboardimage.png"
                    className="dashboard-image"
                  />
                </div>
              </div>
            </div>
            <div className="min-w-[70%] flex items-center">
              <h1 className="text-md font-semibold text-zinc-800">
                What would you like to upload
              </h1>
            </div>

            <div className="w-full flex flex-row space-x-[3%]">
              <Card className="w-[22%]">
                <Ellipse className="w-[48px] h-[48px] bg-purple-900 bg-opacity-70 my-3">
                  <Speedometer size="22" color="#ffffff" variant="Bold" />
                </Ellipse>
                <div className="text-zinc-700 text-base my-2">Minimum Due</div>
              </Card>
              <Card className="w-[22%]">
                <Ellipse className="w-[48px] h-[48px] bg-purple-900 bg-opacity-70 my-3">
                  <TransactionMinus size="22" color="#ffffff" variant="Bold" />
                </Ellipse>
                <div className="text-zinc-700 text-base my-2">Trans File</div>
              </Card>

              <Card className="w-[22%]">
                <Ellipse className="w-[48px] h-[48px] bg-purple-900 bg-opacity-70 my-3">
                  <ReceiveSquare size="22" color="#ffffff" variant="Bold" />
                </Ellipse>
                <div className="text-zinc-700 text-base my-2">Credit Payment</div>
              </Card>

              <Card className="w-[22%]">
                <Ellipse className="w-[48px] h-[48px] bg-purple-900 bg-opacity-70 my-3">
                  <TransmitSquare size="22" color="#ffffff" variant="Bold" />
                </Ellipse>
                <div className="text-zinc-700 text-base my-2">Resend file</div>
              </Card>
            </div>
          </div>
          <div className="basis-[30%] bg-white rounded-lg border border-neutral-900 border-opacity-20 pt-8">
            <div className=" flex flex-col justify-center items-center space-y-8 ">
            <Ellipse className="w-[180px] h-[180px] bg-purple-900">
            <h1 className=" text-7xl font-extrabold text-white">{getFirstLetter(user.staff)}</h1>
            </Ellipse>

            <h1 className=" text-xl font-semibold text-zinc-700">{getFullName(user.staff)}</h1>
            <h1 className="text-zinc-700 text-sm font-semibold  ">{user.email}</h1>
            <button className="bg-white border border-purple-900 py-2 px-7 rounded-lg text-zinc-700 text-sm"> Sign Out</button>
            </div>
           
          </div>
        </div>
    </div>
  </>)

     }
</Fragment>
  
  );
};

export default Dashboard;
