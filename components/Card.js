
const Card = ({ children, className}) => {
  return (
    <div className={className + " " + "flex flex-col bg-white rounded-lg border border-neutral-900 border-opacity-20 justify-start items-start my-3 p-3"}>{children}</div>
  )
}

export default Card