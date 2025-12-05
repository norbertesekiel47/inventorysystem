import { UserButton } from "@stackframe/stack";
import { BarChart3, Package, Plus, Settings } from "lucide-react";
import Link from "next/link";

export default function Sidebar({
  currentPath = "/dashboard",
}: {
  currentPath: string;
}) {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Add Product", href: "/add-product", icon: Plus },
    { name: "Settings", href: "/settings", icon: Settings },
  ];
  return (
    <div className="fixed left-0 top-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white w-64 min-h-screen p-6 z-10 border-r border-purple-500/20 shadow-2xl">
      {/* Logo Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
            <BarChart3 className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            InventoryPro
          </span>
        </div>
      </div>

      <nav className="space-y-2">
        <div className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-3 px-3">
          Navigation
        </div>
        {navigation.map((item, key) => {
          const IconComponent = item.icon;
          const isActive = currentPath === item.href;
          return (
            <Link
              href={item.href}
              key={key}
              className={`group flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105"
                  : "hover:bg-white/10 text-gray-300 hover:text-white hover:translate-x-1"
              }`}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`} />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-gradient-to-t from-black/20 to-transparent">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all duration-300">
          <UserButton showUserInfo />
        </div>
      </div>
    </div>
  );
}
