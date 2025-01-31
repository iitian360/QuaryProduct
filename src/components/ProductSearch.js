import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length === 0) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/search?q=${query}`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    const debounce = setTimeout(fetchProducts, 500);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="parent_container">
      <input
        type="text"
        placeholder="Search for products.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search_box"
      />
      {loading && <p>Loading...</p>}
      <div className="result_container">
        {products.map((product) => (
          <div key={product.id} className="cardBox">
              <h3 className="">Name: {product.title}</h3>
              <div className="">Price: ${product.price}</div>
            <div className="">Description: {product.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
