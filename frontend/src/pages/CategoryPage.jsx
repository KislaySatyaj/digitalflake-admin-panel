import { useEffect, useState } from "react";
import api from "../services/api";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!name.trim()) return;

    await api.post("/categories", { name });
    setName("");
    fetchCategories();
  };

  const handleDeleteCategory = async (id) => {
    await api.delete(`/categories/${id}`);
    fetchCategories();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Page Title */}
      <h2 className="text-xl font-semibold mb-6">Categories</h2>

      {/* Add Category */}
      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleAddCategory}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>

      {/* Category Table */}
      {categories.length === 0 ? (
        <p className="text-gray-500">No categories found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{cat.name}</td>
                  <td className="px-4 py-2">{cat.status}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeleteCategory(cat._id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
