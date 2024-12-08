"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/get-department/:slug",
      handler: "department.GetDepartmentProducts",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
