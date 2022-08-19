import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function chartData(xLabel, yLabel, text) {
  return {
    labels: xLabel,
    datasets: [
      {
        label: text,
        data: yLabel,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53,162,235,0.4)",
      },
    ],
  };
}

function chartOptions(title) {
  return {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        postion: "bottom",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
}

export default function BarChart(props) {
  // console.log(xLabel, yLabel, text);

  let yCoords = [];
  if (
    (props?.products.length !== 0 && props.text === "Stocks") ||
    props.text === "Selling Price"
  ) {
    const productNames = props.products.map((product) => product.name);
    if (props.text === "Stocks") {
      yCoords = props.products.map((product) => product.stock);
      return (
        <div>
          <Bar
            data={chartData(productNames, yCoords, props.text)}
            options={chartOptions(props.title)}
          />
        </div>
      );
    }

    if (props.text === "Selling Price") {
      yCoords = props.products.map((product) => product.selling_price);
      return (
        <div>
          <Bar
            data={chartData(productNames, yCoords, props.text)}
            options={chartOptions(props.title)}
          />
        </div>
      );
    }
  }

  if (
    props?.products.length !== 0 &&
    props?.orders.length !== 0 &&
    props.title === "Most sold products"
  ) {
    //from users want username

    let obj1 = {};
    props.products.forEach((product) => {
      obj1[product.product_id] = 0;
    });

    props.orders.forEach((order) => {
      obj1[order.product_id] += order.quantity;
    });

    let obj2 = {};
    props.products.forEach((product) => {
      //if product_id is equal then replace the obj key(prod_id) with name
      obj2[product.name] = obj1[product.product_id]; //got the quantity
    });

    return (
      <div>
        <Bar
          data={chartData(Object.keys(obj2), Object.values(obj2), props.text)}
          options={chartOptions(props.title)}
        />
      </div>
    );
  }

  if (
    // props?.users.length !== 0 &&
    // props?.products.length !== 0 &&
    // props?.orders.length !== 0 &&
    props?.title === "Most spending users"
  ) {
    //get the u_id from users
    //product(s) ordered by individual users
    //get the SP & store it as value

    //tracing product SP from p_id
    const product_sp = {};
    props.products.forEach((product) => {
      product_sp[product.product_id] = product.selling_price;
    });

    const id_name = {};
    const u_id = props.users.forEach(
      (user) => (id_name[user.user_id] = user.name)
    );
    const user_products_sp = {};
    props.orders.forEach((order) => {
      if (!user_products_sp[order.user_id]) {
        user_products_sp[order.user_id] = [product_sp[order.product_id]];
      } else {
        user_products_sp[order.user_id] = [product_sp[order.product_id]].concat(
          user_products_sp[order.user_id]
        );
      }
    });

    //converting SP arr into sum
    for (let user_id in user_products_sp) {
      user_products_sp[user_id] = user_products_sp[user_id].reduce(
        (acc, el) => acc + el,
        0
      );
    }

    //tracing u_id to name
    for (let user_id in user_products_sp) {
      user_products_sp[id_name[user_id]] = user_products_sp[user_id];
      delete user_products_sp[user_id];
    }

    console.log(user_products_sp);
    return (
      <div>
        <Bar
          data={chartData(
            Object.keys(user_products_sp),
            Object.values(user_products_sp),
            props.text
          )}
          options={chartOptions(props.title)}
        />
      </div>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <CircularProgress />
      <Typography variant="p" style={{ marginLeft: "10px" }}>
        Loading...
      </Typography>
    </Box>
  );
}
