import React from 'react';
import { Link, useLocation } from "react-router-dom";

interface MenuItem {
    title: string;
    path: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
}

interface MenuProps {
    items: MenuItem[];
    className?: string;
}

const NarrowMenu: React.FC<MenuProps> = ({ items }) => {

    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path: string): boolean =>
        currentPath === path || currentPath.includes(`${path}/new`);

    const isParentActive = (path: string, children?: MenuItem[]): boolean => {
        if (children) {
            return children.some(child => isActive(child.path) || isParentActive(child.path, child.children));
        }
        return false;
    };

    return (
        <div className="relative overflow-x-hidden">
            <ul className="menu rounded-xl gap-1 w-full bg-white max-w-[160px] mb-2">
                {items?.map((item) => {
                    const parentActive = isParentActive(item.path, item.children) || isActive(item.path);
                    return (
                      <li
                        key={item.path}
                        className={`hover:scale-105 active:scale-100 transition-all ${
                          parentActive
                            ? "bg-[#FF7959] rounded-xl max-w-[100px] text-white"
                            : "bg-transparent text-black bg-white hover:bg-gray-100 rounded-xl"
                        } `}
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center my-1 font-bold gap-2 break-words ${
                            isActive(item.path)
                              ? "bg-[#FF7959] rounded-lg text-white"
                              : ""
                          }`}
                        >
                          {item.icon && (
                            <span>
                              {React.isValidElement(item.icon) &&
                                React.cloneElement(
                                  item.icon as React.ReactElement,
                                  {
                                    strokeColor: parentActive ? "#FFF" : "#000",
                                  }
                                )}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default NarrowMenu;
