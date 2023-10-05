import { GoogleAuth } from "@/components/googleAuth";
import { ModeToggle } from "@/components/menutoggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col p-10 flex-1 w-screen h-screen">
      <div className="flex justify-end" >
      <ModeToggle />
      </div>
      <div className="flex justify-center pb-6 text-2xl">Notes</div>
      <div className="flex flex-1 justify-center items-center h-screen w-full">
      <GoogleAuth/>
      <a href="instagram://user?username=sainath__48">Designed By</a> 
      </div>
    </main>
  )
}
