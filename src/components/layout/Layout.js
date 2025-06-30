import Header from "./Header";
import SideBar from "./SideBar"

const LayOut=({children})=>{
    console.log("ejoiee")
    console.log(children)
    return(
        <>
            <div className="flex h-screen bg-blue-100">
                <SideBar/>
                <div className="flex-1 flex flex-col overflow-hidden" >
                    <Header/>
                    <main className="p-4">{children}</main>
                </div>

            </div>
        </>
    )
}
export default LayOut
