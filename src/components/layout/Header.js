import { BellIcon } from "@heroicons/react/16/solid"
const Header=()=>{
    return(
        <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-end items-center">
                    <button className="p-1 rounded-full text-blue-300 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <BellIcon className="h-6 w-6"/>
                    </button>
                </div>
        </header>
    )
}
export default Header