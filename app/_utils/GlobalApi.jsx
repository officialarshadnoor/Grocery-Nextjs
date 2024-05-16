const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:1337/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");

const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((resp) => {
    return resp.data.data;
  });

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((resp) => {
    return resp.data.data;
  });

const getAllProducts = () =>
  axiosClient.get("/products?populate=*").then((resp) => {
    return resp.data.data;
  });

const getProductsByCategory = (category) => {
  return axiosClient
    .get(`/products?filters[category][name][$in]=${category}&populate=*`)
    .then((resp) => {
      return resp.data.data;
    });
};

const registerUser = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });

const Signin = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });

const addToCart = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getCartItems = (userId, jwt) =>
  axiosClient
    .get(
      "/user-carts?filters[userId][$eq]=" +
        userId +
        "&[populate][products][populate][images][populate][0]=url",
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((resp) => {
      const data = resp.data.data;
      const cartItemsList = data.map((item, index) => ({
        name: item?.attributes.products.data.attributes.Name,
        quantity: item?.attributes?.quantity,
        amount: item?.attributes?.amount,
        image:
          item?.attributes.products.data.attributes.images.data[0].attributes
            .url,
        actualPrice: item?.attributes?.products?.data[0]?.attributes?.mrp,
        id: item?.id,
        product: item?.attributes.products?.data?.id,
      }));
      return cartItemsList;
    });

const deleteCartItem = (id, jwt) =>
  axiosClient.delete("/user-carts/" + id, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const createOrder = (data, jwt) =>
  axiosClient.post("/orders", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  registerUser,
  Signin,
  addToCart,
  getCartItems,
  deleteCartItem,
  createOrder,
};
