"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom-products",
      handler: "product.customFind",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
