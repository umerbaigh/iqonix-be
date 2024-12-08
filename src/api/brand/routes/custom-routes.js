"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/get-brand/:slug",
      handler: "brand.GetBrandProducts",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
