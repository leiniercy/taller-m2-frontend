import Link from "@node_modules/next/dist/client/link";

const AppMenu = () => {

return (
    <div className="">
        <a href="#home"><i className="fa fa-fw fa-home"></i> Home</a>
        <a href="#services"><i className="fa fa-fw fa-wrench"></i> Services</a>
        <a href="#clients"><i className="fa fa-fw fa-user"></i> Clients</a>
        <a href="#contact"><i className="fa fa-fw fa-envelope"></i> Contact</a>
    </div>
);
};

export default AppMenu;