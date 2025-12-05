import Sidebar from "@/components/sidebar";
import { createProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export default async function AddProductPage() {
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <Sidebar currentPath="/add-product" />

      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Add New Product
              </h1>
              <p className="text-gray-600 mt-2">
                Add a new product to your inventory and start tracking
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 p-8 shadow-lg">
            <form className="space-y-6" action={createProduct}>
              <div className="relative">
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-5 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white/50"
                  placeholder="Enter product name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    Initial Quantity *
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="0"
                    required
                    className="w-full px-5 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white/50"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    Price (USD) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      step="0.01"
                      min="0"
                      required
                      className="w-full pl-8 pr-5 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white/50"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="sku"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  SKU (Stock Keeping Unit)
                  <span className="text-gray-400 font-normal ml-2">Optional</span>
                </label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  className="w-full px-5 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white/50 font-mono"
                  placeholder="e.g., PROD-001"
                />
              </div>

              <div>
                <label
                  htmlFor="lowStockAt"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Low Stock Alert Threshold
                  <span className="text-gray-400 font-normal ml-2">Optional</span>
                </label>
                <input
                  type="number"
                  id="lowStockAt"
                  name="lowStockAt"
                  min="0"
                  className="w-full px-5 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white/50"
                  placeholder="Get alerted when stock falls below this number"
                />
                <p className="mt-2 text-sm text-gray-500">You&apos;ll be notified when quantity drops to or below this value</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Add Product
                </button>
                <Link
                  href="/inventory"
                  className="px-8 py-4 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
