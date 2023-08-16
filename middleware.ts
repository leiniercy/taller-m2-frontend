//
//
// import {withAuth} from 'next-auth/middleware';
// import {NextResponse} from "next/server";
//
//
// export default withAuth(
//     function middleware (req){
//         if(req.nextUrl.pathname.startsWith("/taller") && req.nextauth.token?.rol !== 'ROLE_ADMIN' ){
//             return NextResponse.rewrite(
//                 new URL('/auth/login?message=You are not authorized', req.url)
//             );
//         }
//     },
//     {
//      callbacks: {
//        authorized: ({token}) => !!token,
//      }
//     }
// );
//
// export const config = {
//     matcher: '/taller/:path*',
// };

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    const url  = request.nextUrl.clone();

    let isLogin = request.cookies.get('logged');

    if(!isLogin){
        if(request.nextUrl.pathname.startsWith("/taller") ){
            return NextResponse.rewrite(new URL('/', request.url))
        }
    }else{
        if(url.pathname === '/'){
            url.pathname = '/taller';
            return NextResponse.redirect(url);
        }

    }

    if (request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.rewrite(new URL('/', request.url))
    }

}