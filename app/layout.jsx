import React from "react";
import Head from 'next/head';

// const Layout = (props) => {


//     return (
//         <React.Fragment>
//             <Head>
//                 <title>Taller M2</title>
//                 <meta charSet="UTF-8" />
//                 <meta name="description" content="Taller M2 page." />
//                 <meta name="robots" content="index, follow" />
//                 <meta name="viewport" content="initial-scale=1, width=device-width" />
//                 <meta property="og:type" content="website"></meta>
//                 <meta property="og:title" content="Taller M2 by PrimeReact"></meta>
//                 {/* <meta property="og:url" content="https://www.primefaces.org/sakai-react"></meta> */}
//                 <meta property="og:description" content="Taller M2 page." />
//                 {/* <meta property="og:image" content="https://www.primefaces.org/static/social/sakai-nextjs.png"></meta> */}
//                 <meta property="og:ttl" content="604800"></meta>
//                 <link rel="icon" href={`/favicon.ico`} type="image/x-icon"></link>
//             </Head>

//             <div className="">
                
//                 <div  className="layout-sidebar">
                
//                 </div>
                
//                 <div className="layout-main-container">
//                     <div className="layout-main">{props.children}</div>
//                 </div>
                
//                 <div className="layout-mask"></div>
//             </div>
//         </React.Fragment>
//     );

// };

// export default Layout;


export const metadata = {
    title: "Book store",
    description: "Welcome to the book store"

}

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <div className='app'>
                    {children}
                </div>
            </body>
        </html>
    )
}

export default RootLayout