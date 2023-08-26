import React from 'react';
import {Skeleton} from 'primereact/skeleton';

const AppLoadingSkeleton = () => {


    return (<div className="card w-full">
        <div className="flex flex-row flex-wrap w-full">
            <div className="flex flex-row flex-wrap w-full gap-5 p-3">
                <Skeleton  shape="circle"  size="6rem" className=""></Skeleton>
                <Skeleton className="flex-1" width="w-full" height="6rem"></Skeleton>
            </div>
            <div className="flex flex-row flex-wrap w-full gap-5 p-3">
                <Skeleton className="flex-1 w-5 h-9rem"></Skeleton>
                <Skeleton className="flex-1 w-5 h-9rem"></Skeleton>
                <Skeleton className="flex-1 w-5 h-9rem"></Skeleton>
                <Skeleton className="flex-1 w-5 h-9rem"></Skeleton>
            </div>
            <div className="flex flex-row flex-wrap w-full gap-5 p-3">
                <Skeleton className="flex-1 w-5 h-30rem"></Skeleton>
                <Skeleton className="flex-1 w-5 h-30rem"></Skeleton>
            </div>
        </div>
    </div>);

}

export default AppLoadingSkeleton;