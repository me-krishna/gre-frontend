"use client";
import { Avatar, Dropdown } from "flowbite-react";
import { FC } from "react";
import { FaPowerOff } from "react-icons/fa";

const Header: FC = () => {
  return (
    <header className="bg-[#242c42]">
      <nav>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/images/logo.png"
              className="h-14"
              alt="Dr Raju's Education Academy Logo"
            />
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  placeholderInitials="PB"
                  rounded
                  bordered
                  color="success"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Krishna Reddy Pulluru</span>
                <span className="block truncate text-sm font-medium">
                  krishnareddy@gmail.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item className="flex justify-start items-center gap-3 text-red-600 hover:text-red-800">
                <FaPowerOff />
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
