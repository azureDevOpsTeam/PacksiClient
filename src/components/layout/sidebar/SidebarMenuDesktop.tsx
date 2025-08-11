import React from 'react';
import {Link, useLocation} from "react-router-dom";

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

const Menu: React.FC<MenuProps> = ({items}) => {

    const location = useLocation();
    const currentPath = location.pathname;
    const isActive = (path: string): boolean =>
    currentPath === path || currentPath.includes(`${path}/new`);
    const isParentActive = (path: string, children?: MenuItem[]): boolean => {
        if (currentPath.startsWith(path) || currentPath.includes(`${path}/new`)) return true; // بررسی شامل بودن /new
        if (children) {
            return children.some(child => isParentActive(child.path, child.children));
        }
        return false;
    };

    return (
      <div className="relative max-h-[565px] overflow-y-auto overflow-x-hidden ">
        <ul className="menu rounded-xl gap-1 w-full bg-white max-w-[260px] mb-2 pl-5">
          {items?.map((item) => (
            <li
              key={item.path}
              className={`hover:scale-95 active:scale-100 transition-all ${
                isParentActive(item.path, item.children)
                  ? "rounded-xl text-black"
                  : "bg-transparent text-black  rounded-xl"
              } `}
            >
              {item.children ? (
                <details
                  className="group"
                  open={isParentActive(item.path, item.children)}
                >
                  <summary className="flex items-center justify-between font-bold gap-3 cursor-pointer">
                    <div className="flex items-center gap-3">
                      {item.icon && (
                        <span>
                          {React.isValidElement(item.icon) &&
                            React.cloneElement(
                              item.icon as React.ReactElement,
                              {
                                strokeColor: isActive(item.path)
                                  ? "#111928"
                                  : "#000",
                              }
                            )}
                        </span>
                      )}
                      {item.title}
                    </div>
                  </summary>
                  <div className="relative left-2 rounded-xl overflow-hidden transition-all duration-300 ease-in-out group-open:max-h-[500px] group-open:opacity-100 max-h-0 opacity-0 ">
                    <Menu items={item.children} />
                  </div>
                </details>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center my-1 font-bold gap-2 break-words transition-all
                      ${
                        isActive(item.path)
                          ? "bg-[#FF7959] text-white hover:text-white hover:bg-[#FF7959]"
                          : ""
                      }
                    `}
                >
                  {item.icon && (
                    <span>
                      {React.isValidElement(item.icon) &&
                        React.cloneElement(item.icon as React.ReactElement, {
                          strokeColor: isActive(item.path) ? "#FFF" : "#000",
                          className: isActive(item.path)
                            ? "hover:stroke-black"
                            : "",
                        })}
                    </span>
                  )}

                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
};

export default Menu;
