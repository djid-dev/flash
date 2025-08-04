import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {Plus} from "lucide-react"

export function LinkToolbar() {
  return (
   <nav className="w-full">
  <div className="flex justify-between items-center gap-4 max-w-[60%] mx-auto mt-4 mb-6">
    <div className="w-[25%]">
      <Input placeholder="Search" className="border-red-500  focus-visible:border-red-500 "/>
    </div>
    <div>
      <Button className="bg-red-500 text-white hover:bg-red-400 transition-colors flex items-center gap-2 font-semibold cursor-pointer placeholder:text-neutral-500">
        <Plus className="stroke-2.5 size-6" />
        <span>Create link</span>
      </Button>
    </div>
  </div>
</nav>

  );
}
