"use client"

import AppMenu from "@components/layout/AppMenu";

const AppSidebar = (props) => {


    return (
        <div className="hidden sm:hidden md:flex md:col-fixed md:relative" style={{width: '240px'}}>
            <div className="p-3 fixed z-1" style={{height: 'calc(100vh - 9rem)', width: '240px', left: '-5px'}}>
                <div
                    className="bg-gray-items p-3 border-round-sm h-full w-full font-bold flex flex-column overflow-y-auto">
                    <AppMenu/>
                </div>
            </div>
        </div>
    );

}

export default AppSidebar;