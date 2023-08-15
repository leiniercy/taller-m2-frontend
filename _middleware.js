

// import {withAuth} from 'next-auth/middleware';
// import {NextResponse} from "next/server";
//
//
// export default withAuth(
//     function middleware (req){
//         if(req.nextUrl.pathname.startsWith("/taller") /*&& req.nextauth.token?.role !==admin*/ ){
//             return NextResponse  .rewrite(
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
//     matchers: ['/taller/:path*'],
// }

// import { NextResponse } from 'next/server'
//
// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//     // Check if a user has access...
//     if (!isAuthorized(request)) {
//         return NextResponse.json({ message: 'Unauthorized' });
//     }
//     return NextResponse.redirect(new URL('/taller', request.url))
// }
//
// // See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/taller/:path*',
// }