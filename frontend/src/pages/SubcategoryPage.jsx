import { useEffect, useState } from "react";
import api from "../services/api";

function SubcategoryPage() {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const fetchSubcategories = async () => {
    const res = await api.get("/subcategories");
    setSubcategories(res.data);
  };

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  const handleAddSubcategory = async () => {
    if (!name || !categoryId) return;

    await api.post("/subcategories", {
      name,
      categoryId,
    });

    setName("");
    setCategoryId("");
    fetchSubcategories();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Subcategories</h2>

      {/* Add Subcategory Card */}
      <div className="bg-white shadow rounded-lg p-4 mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Subcategory name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded w-56"
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border px-3 py-2 rounded w-48"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddSubcategory}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Add Subcategory
        </button>
      </div>

      {/* Subcategory Table */}
      {subcategories.length === 0 ? (
        <p className="text-gray-500">No subcategories found</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 border">Subcategory</th>
                <th className="text-left p-3 border">Category</th>
                <th className="text-center p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.map((sub) => (
                <tr key={sub._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{sub.name}</td>
                  <td className="p-3 border">
                    {sub.categoryId?.name || "-"}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={async () => {
                        await api.delete(`/subcategories/${sub._id}`);
                        fetchSubcategories();
                      }}
                      className="text-red-600 hover:underline"
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

export default SubcategoryPage;
