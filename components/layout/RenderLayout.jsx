const RenderLayout = ({children}) => {
    return (
        <>
            <div className="sm:relative sm:col-12 md:col p-2 sm:p-2 md:p-4 mx-auto">
                <div className="flex flex-wrap flex-row gap-2">
                    {children}
                </div>
            </div>
        </>
    );
}

export default RenderLayout;
