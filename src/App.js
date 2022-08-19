import React, { useState, useEffect } from "react";
import BarChart from "./components/BarChart";
import { fetching } from "./functions/asyncFunction";

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [plot1XCoord, setPlot1XCoord] = useState([]);
  const [plot1YCoord, setPlot1YCoord] = useState([]);
  const [plot2XCoord, setPlot2XCoord] = useState([]);
  const [plot2YCoord, setPlot2YCoord] = useState([]);
  const [plot3XCoord, setPlot3XCoord] = useState([]);
  const [plot3YCoord, setPlot3YCoord] = useState([]);

  useEffect(() => {
    fetching("https://assessment.api.vweb.app/users", setUsers);
    fetching("https://assessment.api.vweb.app/products", setProducts);
    fetching("https://assessment.api.vweb.app/orders", setOrders);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Analysis of Products Ordered by the users</h1>
      <div
        style={{
          width: "70%",
        }}
      >
        <BarChart products={products} text="Stocks" title="Product quantity" />
        <BarChart
          products={products}
          text="Selling Price"
          title="Product Selling Price"
        />
        <BarChart
          products={products}
          orders={orders}
          text="Products"
          title="Most sold products"
        />
        <BarChart
          users={users}
          products={products}
          orders={orders}
          text="Total Amount spend by Each User"
          title="Most spending users"
        />
      </div>
    </div>
  );
}

export default App;
