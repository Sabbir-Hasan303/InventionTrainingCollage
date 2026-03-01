import React from "react";
import { Menu, Plus } from "lucide-react";

export default function EventFooter() {
    return (
        <div className="flex justify-between items-center px-[35px] pb-5">
            <button className="p-2 text-[22px] text-black/80 bg-transparent border-0 cursor-pointer">
                <Menu className="w-6 h-6" />
            </button>
            <button className="flex items-center gap-1.5 font-bold text-[15px] text-black bg-transparent border-0 cursor-pointer">
                <Plus className="w-4 h-4" />
                Create Event
            </button>
        </div>
    );
}
