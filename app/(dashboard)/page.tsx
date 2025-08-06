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
    <div className="w-full mx-auto px-4">
       <section className="max-w-lg mx-auto mb-4 px-4">
    <OverViewCard
      title="Reports"
      icon={<BlocksIcon size={25} className="text-red-500" />}
      className="bg-red-100 cursor-pointer hover:bg-red-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
    />
  </section>

  {/* Users & Posts Section */}
  <section className="grid grid-cols-2 gap-3 max-w-lg mx-auto px-4 mb-4">
    <OverViewCard
      title="Total Users"
      value={1500}
      icon={<Users size={35} className="text-blue-500" />}
      className="bg-blue-100 cursor-pointer hover:bg-blue-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
      onClick={() => router.push("/users")}
    />
    <OverViewCard
      title="Total Posts"
      value={300}
      icon={<DockIcon size={35} className="text-yellow-500" />}
      className="bg-yellow-100 cursor-pointer hover:bg-yellow-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
    />
    <OverViewCard
      title="Active Users"
      value={1200}
      icon={<ActivityIcon size={35} />}
      className="bg-green-100 cursor-pointer hover:bg-green-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
    />
    <OverViewCard
      title="Banned Users"
      value={50}
      icon={<Users size={35} className="text-red-500" />}
      className="bg-red-100 cursor-pointer hover:bg-red-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
    />
  </section>

  {/* Actions Section */}
  <section className="grid grid-cols-2 gap-3 max-w-lg mx-auto px-4 mb-4">
    <OverViewCard
      title="Add Pdf"
      icon={<File size={20} />}
      className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
    />
    <OverViewCard
      title="Add Market"
      icon={<Triangle size={20} />}
      className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
      onClick={() => router.push("/add-company")}
    />
    <OverViewCard
      title="Users"
      icon={<Users size={20} />}
      className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
      onClick={() => router.push("/users")}
    />
    <OverViewCard
      title="Locations"
      icon={<MapPin size={20} />}
      className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
      onClick={() => router.push("/add-location")}
    />
    <OverViewCard
      title="Privacy Policy"
      icon={<ShieldMinus size={20} />}
      className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
      onClick={() => router.push("/privacy-policy")}
    />
    <OverViewCard
      title="Banners"
      icon={<Images />}
      className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
      onClick={() => router.push("/banners")}
    />
    <OverViewCard
      title="Terms and Conditions"
      icon={<ReceiptText size={20} />}
      className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
      onClick={() => router.push("/terms-conditions")}
    />
    <OverViewCard
      title="Add Prices"
      icon={<Banknote size={20} />}
      className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
      onClick={() => router.push("/add-prices")}
    />
  </section>
      {/* Add Brands Section */}
<section className="max-w-lg mx-auto mb-4 px-4">
  <h2 className="text-lg font-semibold text-green-600 mb-4">Add brands</h2>
  <div className="grid grid-cols-3 gap-2">
    <button
      onClick={() => router.push("/brands/panels")}
      className="bg-gray-100 rounded-xl py-2 text-sm font-medium hover:bg-gray-200 transition-all"
    >
      Panels
    </button>
    <button
      onClick={() => router.push("/brands/inverters")}
      className="bg-gray-100 rounded-xl py-2 text-sm font-medium hover:bg-gray-200 transition-all"
    >
      Inverters
    </button>
    <button
      onClick={() => router.push("/brands/batteries")}
      className="bg-gray-100 rounded-xl py-2 text-sm font-medium hover:bg-gray-200 transition-all"
    >
      Batteries
    </button>
  </div>
</section>

{/* Posts Dropdown, Profile Verifications, Notifications */}
<section className="max-w-lg mx-auto flex flex-col gap-3 px-4">
  <div>
    <PostsDropdownCard />
  </div>

  <OverViewCard
    title="Profile Verifications"
    icon={<ShieldCheck size={25} />}
    className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
    onClick={() => router.push("/verifications")}
  />

  <OverViewCard
    title="Notifications"
    icon={<Bell size={25} />}
    className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
  />
</section>

</div>
  );
}
