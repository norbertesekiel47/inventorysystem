import Pagination from "@/components/pagination";
import Sidebar from "@/components/sidebar";
import { deleteProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const user = await getCurrentUser();
  const userId = user.id;

  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const page = Math.max(1, Number(params.page ?? 1));
  const pageSize = 5;

  const where = {
    userId,
    ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
  };

  const [totalCount, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <Sidebar currentPath="/inventory" />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Inventory
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your products and track inventory levels with ease.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 p-6 shadow-lg">
            <form className="flex gap-3" action="/inventory" method="GET">
              <div className="flex-1 relative">
                <input
                  name="q"
                  placeholder="Search products by name..."
                  className="w-full px-6 py-4 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
              </div>
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                Search
              </button>
            </form>
          </div>

          {/* Products Table */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">
                      Low Stock Alert
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white/50 divide-y divide-purple-100">
                  {items.map((product, key) => {
                    const isLowStock = product.quantity <= (product.lowStockAt || 5);
                    const isOutOfStock = product.quantity === 0;
                    return (
                      <tr key={key} className="hover:bg-purple-50/50 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`}></div>
                            <span className="font-semibold text-gray-900">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                          {product.sku || <span className="text-gray-400">-</span>}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-purple-900">
                            ${Number(product.price).toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                            isOutOfStock
                              ? 'bg-red-100 text-red-800'
                              : isLowStock
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {product.quantity} units
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {product.lowStockAt || <span className="text-gray-400">Not set</span>}
                        </td>
                        <td className="px-6 py-4">
                          <form
                            action={async (formData: FormData) => {
                              "use server";
                              await deleteProduct(formData);
                            }}
                          >
                            <input type="hidden" name="id" value={product.id} />
                            <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                              Delete
                            </button>
                          </form>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 p-6 shadow-lg">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                baseUrl="/inventory"
                searchParams={{
                  q,
                  pageSize: String(pageSize),
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
