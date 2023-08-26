"use client"

import {useRouter} from "next/navigation";
import React from "react";

import AccessDenied from "@components/pages/Error/AccessDenied";
import CustomError from "@components/pages/Error/CustomError";

const Error = ({error, reset}) => {

    const router = useRouter();

    if(error.message === 'Access denied'){
        return <AccessDenied error={error}/>
    }

    return (
        <CustomError error={error}/>
    );
};


export default Error;