import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { TickCircle, Copy } from "iconsax-react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function MyModal({isOpen, copyItem, closeModal }) {
  let [showAlert, setShowAlert] = useState(false);


  if(showAlert){
    setTimeout(() => {
        setShowAlert(false)
    },5000)
  }


  return (
    <>
      <div className="relative z-10 inset-0 flex items-start justify-center">
    
{
    showAlert ?  <span className=" py-2 px-5 bg-emerald-200 bg-opacity-20 rounded-full text-zinc-700">
    <TickCircle className="inline" size="22" color="#01B272" variant="Bold" />
       &nbsp; ID copied
    </span> : <span></span>
}
       
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[350px] flex flex-col items-center max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 "
                  >
                    <TickCircle size="100" color="#01B272" variant="Bold" />
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-base font-light text-zinc-800  text-center">
                      File upload successful. Your file id has been generated
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="cursor-pointer text-center text-purple-900 text-lg font-bold leading-[28.80px] inline">
                    {copyItem} &nbsp; &nbsp;
                      <CopyToClipboard
                        text={copyItem}
                        onCopy={() => setShowAlert(true)}
                      >
                        <Copy
                          className="inline"
                          size="20"
                          color="#5C2684"
                          variant="Bold"
                        />
                      </CopyToClipboard>
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
