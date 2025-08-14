export default function RowScroll({children}:{children:React.ReactNode}){return(
    <div className="w-full flex items-center overflow-x-scroll">
        {children}
    </div>
)}