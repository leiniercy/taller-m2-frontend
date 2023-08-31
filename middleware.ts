
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    const url  = request.nextUrl.clone();

    let isLogin = request.cookies.get('logged');

    if( isLogin !== undefined && isLogin.value === 'false'){
        if(request.nextUrl.pathname.startsWith("/taller") ){
            return NextResponse.rewrite(new URL('/', request.url))
        }
    }else{
        let rol = request.cookies.get('rol');
        if(rol !== undefined && rol.value === 'ROLE_ADMIN' && url.pathname === '/' ){
            url.pathname = '/taller';
            return NextResponse.redirect(url);
        }else if(rol !== undefined && rol.value === 'ROLE_MODERATOR' && (url.pathname === '/' || url.pathname === '/taller' )){
            let taller = request.cookies.get('taller');
            if(taller !== undefined && taller.value === "Taller 2M"){
                url.pathname = '/taller/informacion/taller2M';
                return NextResponse.redirect(url);
            }else if(taller !== undefined && taller.value === "Taller MJ"){
                url.pathname = '/taller/informacion/tallerMJ';
                return NextResponse.redirect(url);
            }
        }

    }

    if (request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.rewrite(new URL('/', request.url))
    }

}