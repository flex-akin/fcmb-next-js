"use client";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ArrowDown2 } from "iconsax-react";

import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({ display, items }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 bg-white ">
          {display}
          <ArrowDown2
            className="inline ml-4"
            size="22"
            color="#292D32"
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none font-light">
          <div className="py-1">
            {items.map((item, i) => (
              <Menu.Item key={i}>
                {({ active }) => (
                  <Link
                    href={`/dashboard/${item.link}`}
                    className={classNames(
                      active ? " bg-purple-200 text-zinc-700" : "text-zinc-700",
                      "block px-4 py-4 text-sm"
                    )}
                  >
                    {item.title}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
