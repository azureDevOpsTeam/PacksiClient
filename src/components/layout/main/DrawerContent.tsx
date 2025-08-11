import React from 'react';


function DrawerContent({content, mini}: any) {
    return (
      <div className="drawer z-50 absolute">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn hover:scale-105 active:scale-100 transition-all w-12 h-12 bg-[#FF7959] border-none text-white drawer-button fixed right-[10px] top-[40px] rounded-full lg:hidden"
          >
            A
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div
            className={
              "backdrop-blur-[3px] rounded-l-lg text-base-content min-h-full transition-all"
            }
            style={{ width: mini ? 160 : 320 }}
          >
            {content}
          </div>
        </div>
      </div>
    );
}

export default DrawerContent;