import ProductsChart from "@/components/products-chart";
import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TrendingUp, Package } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const userId = user.id;

  const [totalProducts, lowStock, allProducts] = await Promise.all([
    prisma.product.count({ where: { userId } }),
    prisma.product.count({
      where: {
        userId,
        lowStockAt: { not: null },
        quantity: { lte: 5 },
      },
    }),
    prisma.product.findMany({
      where: { userId },
      select: { price: true, quantity: true, createdAt: true },
    }),
  ]);

  const totalValue = allProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0
  );

  const inStockCount = allProducts.filter((p) => Number(p.quantity) > 5).length;
  const lowStockCount = allProducts.filter(
    (p) => Number(p.quantity) <= 5 && Number(p.quantity) >= 1
  ).length;
  const outOfStockCount = allProducts.filter(
    (p) => Number(p.quantity) === 0
  ).length;

  const inStockPercentage =
    totalProducts > 0 ? Math.round((inStockCount / totalProducts) * 100) : 0;
  const lowStockPercentage =
    totalProducts > 0 ? Math.round((lowStockCount / totalProducts) * 100) : 0;
  const outOfStockPercentage =
    totalProducts > 0 ? Math.round((outOfStockCount / totalProducts) * 100) : 0;

  const now = new Date();
  const weeklyProductsData = [];

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekStart.setHours(23, 59, 59, 999);

    const weekLabel = `${String(weekStart.getMonth() + 1).padStart(
      2,
      "0"
    )}/${String(weekStart.getDate() + 1).padStart(2, "0")}`;

    const weekProducts = allProducts.filter((product) => {
      const productDate = new Date(product.createdAt);
      return productDate >= weekStart && productDate <= weekEnd;
    });

    weeklyProductsData.push({
      week: weekLabel,
      products: weekProducts.length,
    });
  }

  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  console.log(totalValue);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <Sidebar currentPath="/dashboard" />
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome back! Here&apos;s an overview of your inventory performance.
              </p>
            </div>
            <Link
              href="/inventory"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer inline-block"
            >
              <span className="font-semibold">View All Products</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Package className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-300" />
            </div>
            <div className="text-4xl font-bold mb-2">{totalProducts}</div>
            <div className="text-purple-100 font-medium">Total Products</div>
            <div className="mt-3 pt-3 border-t border-white/20">
              <span className="text-sm text-purple-200">+{totalProducts} all time</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-rose-700 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-300" />
            </div>
            <div className="text-4xl font-bold mb-2">${Number(totalValue).toFixed(0)}</div>
            <div className="text-pink-100 font-medium">Total Value</div>
            <div className="mt-3 pt-3 border-t border-white/20">
              <span className="text-sm text-pink-200">Inventory worth</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-700 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Package className="w-6 h-6" />
              </div>
              {lowStock > 0 && <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>}
            </div>
            <div className="text-4xl font-bold mb-2">{lowStock}</div>
            <div className="text-orange-100 font-medium">Low Stock Items</div>
            <div className="mt-3 pt-3 border-t border-white/20">
              <span className="text-sm text-orange-200">Needs attention</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* Inventory over time */}
          <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Product Growth</h2>
                <p className="text-sm text-gray-500 mt-1">New products added per week</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="h-48">
              <ProductsChart data={weeklyProductsData} />
            </div>
          </div>

          {/* Stock Efficiency */}
          <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Stock Health</h2>
                <p className="text-sm text-gray-500 mt-1">Current inventory status</p>
              </div>
            </div>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="#e5e7eb"
                    strokeWidth="16"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="url(#gradient)"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${(inStockPercentage / 100) * 502.4} 502.4`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {inStockPercentage}%
                    </div>
                    <div className="text-sm text-gray-600 font-medium">In Stock</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                  <span className="font-medium text-gray-700">In Stock</span>
                </div>
                <span className="font-bold text-gray-900">{inStockPercentage}%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"></div>
                  <span className="font-medium text-gray-700">Low Stock</span>
                </div>
                <span className="font-bold text-gray-900">{lowStockPercentage}%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-red-50 to-rose-50">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-rose-500"></div>
                  <span className="font-medium text-gray-700">Out of Stock</span>
                </div>
                <span className="font-bold text-gray-900">{outOfStockPercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Stock Levels */}
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recent Products</h2>
              <p className="text-sm text-gray-500 mt-1">Latest additions to your inventory</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-3">
            {recent.map((product, key) => {
              const stockLevel =
                product.quantity === 0
                  ? 0
                  : product.quantity <= (product.lowStockAt || 5)
                  ? 1
                  : 2;

              const gradients = [
                "from-red-500 to-rose-600",
                "from-yellow-500 to-orange-600",
                "from-green-500 to-emerald-600",
              ];
              const bgGradients = [
                "from-red-50 to-rose-50",
                "from-yellow-50 to-orange-50",
                "from-green-50 to-emerald-50",
              ];
              const textColors = [
                "text-red-700",
                "text-orange-700",
                "text-green-700",
              ];
              return (
                <div
                  key={key}
                  className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${bgGradients[stockLevel]} border border-gray-100 hover:scale-102 transition-all duration-200`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-4 h-4 rounded-full bg-gradient-to-r ${gradients[stockLevel]} shadow-lg`}
                    />
                    <div>
                      <span className="font-semibold text-gray-900">
                        {product.name}
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">
                        ${Number(product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${textColors[stockLevel]}`}>
                      {product.quantity}
                    </div>
                    <div className="text-xs text-gray-500">units</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
