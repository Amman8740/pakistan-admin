import BatteryForm from "@/components/BatteryForm";
import InverterForm from "@/components/InverterForm";
import PanelForm from "@/components/PanelForm";
import Link from "next/link";
import { notFound } from "next/navigation";
type Props = {
    params: {
        type:string;
    }
}

export default function CreatePage ({params}: Props) {
    const { type } = params;
    if (!["panel", "inverter", "battery"].includes(type)){
        notFound();
    }
    return (
        <div className="p-6 mx-auto space-y-8 w-[90%]">
        <h2 className="text-2xl font-bold mb-6 capitalize">Create New</h2>
  
        {/* Shared container with one background */}
        <div className="flex rounded-xl overflow-hidden bg-gray-100">
          {[
            { name: "Panel", path: "/create/panel" },
            { name: "Battery", path: "/create/battery" },
            { name: "Inverter", path: "/create/inverter" },
          ].map((item) => {
            const isActive = type === item.name.toLowerCase();
  
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex-1 text-center py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-green-600 text-white rounded-3xl"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
  
        <div className="bg-white rounded-xl shadow p-6">
          {type === "panel" && <PanelForm />}
          {type === "inverter" && <InverterForm />}
          {type === "battery" && <BatteryForm />}
        </div>
      </div>
  
    )
}