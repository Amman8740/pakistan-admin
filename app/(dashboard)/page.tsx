"use client";
import OverViewCard from "@/components/OverviewCard";
import PostsDropdownCard from "@/components/PostDropDownCard";
import {
  ActivityIcon,
  Banknote,
  Bell,
  BlocksIcon,
  DockIcon,
  File,
  Images,
  MapPin,
  ReceiptText,
  ShieldCheck,
  ShieldMinus,
  Triangle,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardHome() {
  const router = useRouter();
  return (
    <>
      <div className="w-[60%] mx-auto mb-6">
        <OverViewCard
          title="Reports"
          icon={<BlocksIcon size={25} className="text-red-500" />}
          className="bg-red-100 cursor-pointer hover:bg-red-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
        />
      </div>
      <section className="w-[60%] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <OverViewCard
          title="Total Users"
          value={1500}
          icon={<Users size={35} className="text-blue-500" />}
          className="bg-blue-100 cursor-pointer hover:bg-blue-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
          onClick={()=> router.push("/users")}
        />
        <OverViewCard
          title="Active Users"
          value={1200}
          icon={<ActivityIcon size={35} />}
          className="bg-green-100 cursor-pointer hover:bg-green-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
        />
        <OverViewCard
          title="Total Posts"
          value={300}
          icon={<DockIcon size={35} className="text-yellow-500" />}
          className="bg-yellow-100 cursorr-pointer hover:bg-yellow-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
        />
        <OverViewCard
          title="Banned Users"
          value={50}
          icon={<Users size={35} className="text-red-500" />}
          className="bg-red-100 cursor-pointer hover:bg-red-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
        />
      </section>
      <section className="w-[60%] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <OverViewCard
          title="Add Pdf"
          icon={<File size={20} />}
          className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
        />
        <OverViewCard
          title="Add Market"
          icon={<Triangle size={20} />}
          className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
          onClick={()=> router.push("/add-company")}
        />
        <OverViewCard
          title="Users"
          icon={<Users size={20} />}
          className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
          onClick={()=> router.push("/users")}
        />
        <OverViewCard
          title="Locations"
          icon={<MapPin size={20} />}
          className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
          onClick={()=> router.push("/add-location")}
        />
        <OverViewCard
          title="Privacy Policy"
          icon={<ShieldMinus size={20} />}
          className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
          onClick={()=> router.push("/privacy-policy")}
        />
        <OverViewCard
          title="Banners"
          icon={<Images />}
          className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
          onClick={()=> router.push("/banners")}
        />
        <OverViewCard
          title="Terms and Conditions"
          icon={<ReceiptText size={20} />}
          className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
          onClick={()=> router.push("/terms-conditions")}
        />
        <OverViewCard
          title="Add Prices"
          icon={<Banknote size={20} />}
          className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
          onClick={()=> router.push("/add-prices")}
        />
      </section>
      <section className="w-[60%] mx-auto mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Brands</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <OverViewCard
            title="Panels"
            className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
            onClick={()=> router.push("/brands/panels")}
          />
          <OverViewCard
            title="Inverters"
            className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
            onClick={()=> router.push("/brands/inverters")}
          />
          <OverViewCard
            title="Batteries"
            className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
            onClick={()=> router.push("/brands/batteries")}
          />
        </div>
      </section>
      <section className="w-full flex flex-col items-center gap-4">
      <div className="w-[60%]">
    <PostsDropdownCard />
  </div>
  <div className="w-[60%] ">
  <OverViewCard title="Profile Verifications" icon={<ShieldCheck size={25}/>} className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
  onClick={()=>router.push("/verifications")}
  />
  </div>
  <div className="w-[60%]">
  <OverViewCard title="Notifications" icon={<Bell size={25}/>} className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"/>
  </div>
</section>
</>
  );
}
