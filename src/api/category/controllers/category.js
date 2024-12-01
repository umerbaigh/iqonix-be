// @ts-nocheck
"use strict";

/**
 * category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async create(ctx) {
      const { id, ...rest } = ctx.request.body;

      // Check if an entry with the same `id` already exists
      const existingCategory = await strapi.db
        .query("api::category.category")
        .findOne({
          where: { id },
        });

      if (existingCategory) {
        // Return an error response if `id` already exists
        return ctx.badRequest("ID already exists");
      }

      // Proceed to create the new entry with `publishedAt` set to the current date to publish it
      const newCategory = await strapi.db
        .query("api::category.category")
        .create({
          data: {
            id,
            ...rest,
            publishedAt: new Date(), // Automatically publish the entry
          },
        });

      return newCategory;
    },

    async GetAllProducts(ctx) {
      try {
        const { slug } = ctx.params;
        const {
          color,
          width,
          height,
          depth,
          delivery,
          size,
          material,
          min_sale_price,
          max_sale_price,
          sort,
          page = 1,
          pageSize = 35,
        } = ctx.query;

        if (!slug) {
          return ctx.badRequest("Slug parameter is missing");
        }

        // Fetch the initial category by slug
        const [category] = await strapi.entityService.findMany(
          "api::category.category",
          {
            filters: { slug },
            populate: ["products"], // Populate the products directly under this category
          }
        );

        if (!category) {
          return ctx.notFound("Category not found");
        }

        // Helper function to recursively fetch products for a category and its subcategories
        const fetchProductsRecursively = async (categoryId) => {
          const products = [];

          // Construct dynamic product filters based on query parameters
          const productFilters = {};

          if (color) productFilters.color = { $eq: color.split("_").join(" ") };
          if (width) productFilters.width = { $eq: width.split("_").join(" ") };
          if (height)
            productFilters.height = { $eq: height.split("_").join(" ") };
          if (depth) productFilters.depth = { $eq: depth.split("_").join(" ") };
          if (delivery)
            productFilters.delivery = { $eq: delivery.split("_").join(" ") };
          if (size) productFilters.size = { $eq: size.split("_").join(" ") };
          if (material)
            productFilters.material = { $eq: material.split("_").join(" ") };
          if (min_sale_price)
            productFilters.sale_price = { $gte: parseFloat(min_sale_price) };
          if (max_sale_price)
            productFilters.sale_price = { $lte: parseFloat(max_sale_price) };

          // Fetch products for the current category
          const currentCategory = await strapi.entityService.findOne(
            "api::category.category",
            categoryId,
            {
              populate: {
                products: {
                  filters: productFilters, // Apply filters to products
                },
              },
            }
          );

          if (currentCategory?.products) {
            products.push(...currentCategory.products);
          }

          // Fetch subcategories whose parent is the current category
          const subcategories = await strapi.entityService.findMany(
            "api::category.category",
            {
              filters: { parent: { id: categoryId } }, // Match subcategories by parent ID
            }
          );

          // Recursively fetch products for each subcategory
          for (const subcategory of subcategories) {
            const subcategoryProducts = await fetchProductsRecursively(
              subcategory.id
            );
            products.push(...subcategoryProducts);
          }

          return products;
        };

        // Fetch all products for the category and its subcategories
        const allProducts = await fetchProductsRecursively(category.id);
        if (sort) {
          if (sort === "createdAt") {
            allProducts.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
          } else if (sort === "-createdAt") {
            allProducts.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
          } else if (sort === "sale_price") {
            allProducts.sort((a, b) => a.sale_price - b.sale_price);
          } else if (sort === "-sale_price") {
            allProducts.sort((a, b) => b.sale_price - a.sale_price);
          }
        }
        if (parseInt(page, 10) === -1) {
          return {
            category,
            products: allProducts,
            meta: {
              total: allProducts.length,
              page: -1,
              pageSize: allProducts.length,
              totalPages: 1,
            },
          };
        }

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + parseInt(pageSize, 10);
        const paginatedEntries = allProducts.slice(startIndex, endIndex);
        return {
          category,
          products: paginatedEntries,
          meta: {
            total: paginatedEntries.length,
            page: parseInt(page, 10),
            pageSize: parseInt(pageSize, 10),
            totalPages: Math.ceil(
              paginatedEntries.length / parseInt(pageSize, 10)
            ),
          },
        };
      } catch (error) {
        console.error("Error in findCategoryProducts:", error);
        ctx.throw(
          500,
          "Failed to fetch products for category and its subcategories"
        );
      }
    },
  })
);
