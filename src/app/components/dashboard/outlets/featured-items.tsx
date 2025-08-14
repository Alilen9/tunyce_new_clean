import { FaWarehouse } from "react-icons/fa6";

export const FeaturedItem = ({ title, onClick }: { title: string, onClick?: () => void }) => (
    <div
        onClick={onClick}
        className="w-50 h-52 relative mx-3 rounded-xl overflow-hidden cursor-pointer shadow-lg transform transition-transform hover:scale-105"
    >
       <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-[#58181C]">
      <FaWarehouse className="text-white text-6xl" />
    </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#58181C] via-[#58181C]/70 to-transparent"></div>
        <div className="absolute bottom-0 w-full text-center p-3">
            <h4 className="text-white font-bold text-lg">
                {title}
            </h4>
        </div>
    </div>
);
