const LogoCard = ({name, url}: {name:string, url:string}) => {
    // const imageURL = "brave://favicon2/?size=64&pageUrl=" + url;
    const imageURL = "/images/" + name.toLocaleLowerCase() + ".png";
  return (
    <div className="group flex-col w-18 text-center hover:cursor-pointer">
        <div className="ml-[10%] mr-[10%] border-none rounded-2xl bg-soft-zinc h-14 w-14 p-2.5 group-hover:bg-light-soft-zinc transition-colors duration-300">
            <img 
                className="rounded-[3px]"
                src={imageURL}
                alt="Favicon"
            />
        </div>
            <p className="ml-[5%] mr-[5%] text-sm overflow-hidden text-ellipsis">{name}</p>
    </div>
  );
};

export default LogoCard;
