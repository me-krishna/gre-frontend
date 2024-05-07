"use client";
import { decryptData } from "../../lib/crypt";
import { logout } from "../../lib/auth";
import { Avatar, Dropdown } from "flowbite-react";
import { FC, useEffect, useState } from "react";
import { FaPowerOff } from "react-icons/fa";

const Header: FC = () => {
  const [user, setUser] = useState({ name: "", email: "" });

  const avatarCreator = (name: string) => {
    if (!name) return "";
    const nameArray = name.split(" ");
    if (nameArray.length > 1) {
      return (
        nameArray[0].charAt(0).toUpperCase() +
        nameArray[1].charAt(0).toUpperCase()
      );
    } else {
      return (
        nameArray[0].charAt(0).toUpperCase() +
        nameArray[0].charAt(1).toUpperCase()
      );
    }
  };

  useEffect(() => {
    const user = localStorage.getItem(process.env.REACT_APP_USER_KEY);
    if (user) {
      const { name, email } = decryptData(user);
      setUser({
        name,
        email,
      });
    } else {
      logout();
    }
  }, []);

  return (
    <header className="bg-[#242c42]">
      <nav>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/images/logos/logo.png"
              className="h-[50px] bg-black rounded-lg px-2 py-1"
              alt="Dr Raju's Education Academy Logo"
            />
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  placeholderInitials={avatarCreator(user.name)}
                  rounded
                  bordered
                  color="success"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.name}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item
                onClick={logout}
                className="flex justify-start items-center gap-3 text-red-600 hover:text-red-800"
              >
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
