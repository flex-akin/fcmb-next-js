import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import axiosInterceptorInstance from "@utils/axiosInstance";
import { TickCircle, CloseCircle } from "iconsax-react";

export default function MyModal({
  openDisableModal,
  closeModal,
  data,
  action,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(false);

let url;

  if (action == "deactivate")
  {
    url = "/api/v1/user/users/deactivate"
  }
  else if (action == "activate")
  {
    url = "/api/v1/user/users/activate"

  }

  const deactivateUser = () => {
    setIsLoading(true);
    const config = {
      method: "post",
      url: url,
      contentType: "application/json-patch+json",
      data: {
        username: data,
      },
    };
    axiosInterceptorInstance(config)
      .then((response) => {
        setResponse(true);
        setMessage(response.data.message ? response.data.message : response.data.Message );
        setIsLoading(false);
        setSuccess(true);
        console.log(response);
      })
      .catch((error) => {
        setResponse(true);
        var errorData = JSON.parse(error.request.response);
        setMessage(errorData.Message ? errorData.Message : errorData.message);
        setIsLoading(false);
        setSuccess(false);
      });
  };

  if (response) {
    setTimeout(() => {
      setResponse(false);
    }, 5000);
  }

  return (
    <>
    
      <Transition appear show={openDisableModal} as={Fragment}>
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
                {response ? (
                  <Dialog.Panel className="w-[350px] justify-center flex flex-col items-center max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title className="text-center text-sm font-light text-zinc-800 leading-6 ">
                      <span className="font-semibold flex justify-center items-center">
                        {success ? (
                          <TickCircle
                            size="100"
                            color="#01B272"
                            variant="Bold"
                          />
                        ) : (
                          <CloseCircle
                            size="100"
                            color="#EB001B"
                            variant="Bold"
                          />
                        )}
                      </span>
                      <span className="max-width-[300px] overflow-hidden">
                        {message}
                      </span>
                    </Dialog.Title>
                    <div className="mt-2"></div>
                  </Dialog.Panel>
                ) : (
                  <Dialog.Panel className="w-[350px] flex flex-col items-center max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title className="text-center text-sm font-light text-zinc-800 leading-6 ">
                        <span className="font-semibold"> {action} this user?</span>

                      <span className="max-width-[300px] overflow-hidden">
                        {data}
                      </span>
                    </Dialog.Title>
                    <div className="mt-2">
                      { isLoading ? (
                        <button
                          onClick={deactivateUser}
                          className="rounded-md bg-purple-200 text-white text-[12px] px-5 py-2 my-3 "
                          disabled
                        >
                          Loading
                        </button>
                      ) : (
                        <button
                          onClick={deactivateUser}
                          className="rounded-md bg-purple-800 text-white text-[12px] px-5 py-2 my-3"
                        >
                          {action}
                        </button>
                      )}
                    </div>
                  </Dialog.Panel>
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
