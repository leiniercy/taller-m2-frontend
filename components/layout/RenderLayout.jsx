

const RenderLayout = ({children}) => {
    return (
        <>
            <div className="sm:relative sm:col-12 md:col p-2 sm:p-2 md:p-4">
             {children}
            </div>
        </>
    );
}

export default RenderLayout;
