"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/category/:slug",
      handler: "category.GetAllProducts",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
