"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { ArrowSquareDown } from "iconsax-react";

const ActionDropdown = (props) => {
  const disableModalState = () => {
    props.userData(props.data);
    props.modalStates(true);
    props.actionType("deactivate");
  };

  const activateModalState = () => {
    props.userData(props.data);
    props.modalStates(true);
    props.actionType("activate");
  };
  const items = [
    {
      name: "Edit",
      onClickEvent: disableModalState,
    },
    {
      name: "Disable",
      onClickEvent: disableModalState,
    },
    {
      name: "Delete",
      onClickEvent: disableModalState,
    },
    {
      name: "Activate",
      onClickEvent: activateModalState,
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full border border-purple-900 justify-center items-center text-purple-900 rounded-md bg-white  px-4 py-1 text-sm font-medium   ">
          Actions
          <ArrowSquareDown
            className="inline  ml-4"
            size="14"
            color="#5C2684"
            variant="Bold"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-1 w-40 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none font-light">
          <div className="py-1">
            {items.map((item, i) => (
              <Menu.Item key={i}>
                {({ active }) => (
                  <button
                    type="button"
                    className={classNames(
                      active ? " bg-purple-900 text-white" : "text-zinc-700",
                      "block py-2 px-2 w-full text-sm text-start text-white "
                    )}
                    onClick={item.onClickEvent}
                  >
                    {item.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ActionDropdown;
