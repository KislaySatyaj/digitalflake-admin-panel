import { useEffect, useState } from "react";
import api from "../services/api";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const fetchSubcategories = async () => {
    const res = await api.get("/subcategories");
    setSubcategories(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubcategories();
  }, []);

  const handleAddProduct = async () => {
    if (!name || !categoryId || !subcategoryId) return;

    await api.post("/products", {
      name,
      categoryId,
      subcategoryId,
    });

    setName("");
    setCategoryId("");
    setSubcategoryId("");
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Products</h2>

      {/* Add Product Card */}
      <div className="bg-white shadow rounded-lg p-4 mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded w-56"
        />

        <select
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setSubcategoryId("");
          }}
          className="border px-3 py-2 rounded w-48"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={subcategoryId}
          onChange={(e) => setSubcategoryId(e.target.value)}
          className="border px-3 py-2 rounded w-48"
          disabled={!categoryId}
        >
          <option value="">Select Subcategory</option>
          {subcategories
            .filter(
              (sub) =>
                sub.categoryId &&
                sub.categoryId._id.toString() === categoryId
            )
            .map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
        </select>

        <button
          onClick={handleAddProduct}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Add Product
        </button>
      </div>

      {/* Product Table */}
      {products.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 border">Product</th>
                <th className="text-left p-3 border">Category</th>
                <th className="text-left p-3 border">Subcategory</th>
                <th className="text-center p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{prod.name}</td>
                  <td className="p-3 border">
                    {prod.categoryId?.name || "-"}
                  </td>
                  <td className="p-3 border">
                    {prod.subcategoryId?.name || "-"}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={async () => {
                        await api.delete(`/products/${prod._id}`);
                        fetchProducts();
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

export default ProductPage;
