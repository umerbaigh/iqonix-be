module.exports = {
  routes: [
    // Default GET route to fetch all products
    {
      method: "GET",
      path: "/products", // Default route for fetching all products
      handler: "product.find",
      config: {
        auth: false, // Set to true if authentication is required
      },
    },
    // Default GET route to fetch a single product by ID
    {
      method: "GET",
      path: "/products/:id", // Default route for fetching a single product by ID
      handler: "product.findOne",
      config: {
        auth: false, // Set to true if authentication is required
      },
    },
    // Default POST route to create a product
    {
      method: "POST",
      path: "/products",
      handler: "product.create",
      config: {
        auth: false, // Set to true if authentication is required
      },
    },
    // Default PUT route to update a product by ID
    {
      method: "PUT",
      path: "/products/:id",
      handler: "product.update",
      config: {
        auth: false, // Set to true if authentication is required
      },
    },
    // Default DELETE route to delete a product by ID
    {
      method: "DELETE",
      path: "/products/:id",
      handler: "product.delete",
      config: {
        auth: false, // Set to true if authentication is required
      },
    },
    // Custom route for your custom API
    {
      method: "GET",
      path: "/custom-products", // Custom route for specific logic
      handler: "product.customFind",
      config: {
        auth: false, // Set to true if authentication is required
      },
    },
  ],
};
