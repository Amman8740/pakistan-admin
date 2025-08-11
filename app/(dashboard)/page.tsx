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
import { getAllUsers } from "@/app/hooks/useAdmin";
import { getAllPosts } from "../hooks/usePanel";
import { useEffect, useState } from "react";

export default function DashboardHome() {
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState(0);
    const [bannedUsers, setBannedUsers] = useState(0);
  const router = useRouter();

useEffect(() => {
  const fetchData = async () => {
    try {
      const [users, { meta }] = await Promise.all([
        getAllUsers(),
        getAllPosts({ page: 1, limit: 1 }), // any limit; total comes from meta
      ]);

      setTotalUsers(users.length);
      setActiveUsers(users.filter((u: any) => u.status === "active").length);
      setBannedUsers(users.filter((u: any) => u.status === "banned").length);

      setTotalPosts(meta?.total ?? 0); // <-- the real total in DB
    } catch (err) {
      console.error("Failed to fetch overview data:", err);
    }
  };
  fetchData();
}, []);
  return (
    <div className="w-full mx-auto px-4 lg:max-w-[70%]">
       <section className="w-full mx-auto mb-4 px-4">
    <OverViewCard
      title="Reports"
      icon={<BlocksIcon size={25} className="text-red-500" />}
      className="bg-red-100 cursor-pointer hover:bg-red-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
    />
  </section>

  {/* Users & Posts Section */}
  <section className="grid grid-cols-2 gap-3 w-full mx-auto px-4 mb-4">
    <OverViewCard
  title="Total Users"
  value={totalUsers}
  icon={<Users size={35} className="text-blue-500" />}
  className="bg-blue-100 cursor-pointer hover:bg-blue-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
  onClick={() => router.push("/users")}
  verticalOnMobile
/>

<OverViewCard
  title="Total Posts"
  value={totalPosts}
  icon={<DockIcon size={35} className="text-yellow-500" />}
  className="bg-yellow-100 cursor-pointer hover:bg-yellow-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
  onClick={()=>router.push('/posts/all')}
  verticalOnMobile
/>

<OverViewCard
  title="Active Users"
  value={activeUsers}
  icon={<ActivityIcon size={35} />}
  className="bg-green-100 cursor-pointer hover:bg-green-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
  onClick={() => router.push("/users?status=active")}
  verticalOnMobile
/>

<OverViewCard
  title="Banned Users"
  value={bannedUsers}
  icon={<Users size={35} className="text-red-500" />}
  className="bg-red-100 cursor-pointer hover:bg-red-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
  onClick={() => router.push("/users?status=banned")}
  verticalOnMobile
/>
  </section>

  {/* Actions Section */}
  <section className="grid grid-cols-2 gap-3 w-full mx-auto px-4 mb-4">
    <OverViewCard
      title="Add Pdf"
      icon={<File size={20} />}
      className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
      onClick={()=> router.push('/add-pdf')}
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
<section className="w-full mx-auto mb-4 px-4">
  <h2 className="text-lg font-semibold text-green-600 mb-4">Add brands</h2>
  <div className="grid grid-cols-3 gap-2">
    <button
      onClick={() => router.push("/brands/panels")}
      className="bg-gray-100 rounded-xl py-2 text-sm font-medium hover:bg-gray-200 transition-all cursor-pointer"
    >
      Panels
    </button>
    <button
      onClick={() => router.push("/brands/inverters")}
      className="bg-gray-100 rounded-xl py-2 text-sm font-medium hover:bg-gray-200 transition-all cursor-pointer"
    >
      Inverters
    </button>
    <button
      onClick={() => router.push("/brands/batteries")}
      className="bg-gray-100 rounded-xl py-2 text-sm font-medium hover:bg-gray-200 transition-all cursor-pointer"
    >
      Batteries
    </button>
  </div>
</section>

{/* Posts Dropdown, Profile Verifications, Notifications */}
<section className="w-full mx-auto flex flex-col gap-3 px-4">
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
