import Plans from "@/app/components/dashboard/plan-cards";

const hasPlan = true; // Change this to simulate

export default function Advert() {
  return hasPlan ? (
    <div className="min-h-screen bg-red-50 p-2">
      <h2 className="text-2xl font-bold mb-4 text-[#58181C]">Advert Dashboard</h2>
      <div className="bg-white shadow p-6 rounded-lg border border-gray-200">
        <p className="text-gray-700 mb-4">Manage your advertisements here.</p>
        {/* Add your advert management components here */}
        <a
              href="https://advertmanager.tunycemedia.com/#/add-advert"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tunyce-maroon font-semibold hover:underline ml-8"
            >
              <button className="bg-[#58181C] text-white font-bold px-6 py-2 rounded-full hover:bg-[#A94C4C] transition-colors duration-300 cursor-pointer">
                Go to Create Advert 
              </button>
            </a>
        </div>
    </div>
  ) : (
    <div className="min-h-screen bg-red-50 p-2">
      <div className="text-center p-10 bg-[#FFF4F4] rounded-2xl">
        <h2 className="text-xl font-bold mb-4 text-[#C81E1E]">No Active Plan</h2>
        <Plans />
      </div>
    </div>
  );
}
