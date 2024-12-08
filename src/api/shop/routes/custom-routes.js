"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/get-shop/:slug",
      handler: "shop.GetShopProducts",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
