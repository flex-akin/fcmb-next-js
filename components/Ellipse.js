const Ellipse = ({className, children}) => {
  return (
<div className={className + " " + "grid place-content-center rounded-full"}>
    {children}
    </div>
  )
  
};

export default Ellipse;
