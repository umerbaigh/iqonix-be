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
          sales = false,
          delivery,
          furniture_color,
          furniture_material,
          breite,
          hoehe,
          tiefe,
          damen_normalgr,
          damen_jeansgr,
          damen_kurzgr,
          damen_langgr,
          cup_gr,
          brustumfang,
          miederhosengr,
          strumpfhosengr,
          sockengr,
          herren_normalgr,
          herren_jeansgr,
          kragenweite,
          herren_untersetztgr,
          herren_schlankgr,
          waschegr,
          herren_bauchgr,
          baby_normalgr,
          kinder_normalg,
          kinder_sockengr,
          schuhgr,
          kinder_schuhgr,
          fashion_material,
          fashion_color,
          shoes_material,
          shoes_color,
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
        const fetchProductsRecursively = async (
          categoryId,
          reducedFields = false
        ) => {
          const products = [];

          // Construct dynamic product filters based on query parameters
          const productFilters = {};

          if (furniture_color)
            productFilters.furniture_color = {
              $eq: furniture_color.split("_").join(" "),
            };
          if (furniture_material)
            productFilters.furniture_material = {
              $eq: furniture_material.split("_").join(" "),
            };
          if (breite)
            productFilters.breite = { $eq: breite.split("_").join(" ") };
          if (hoehe) productFilters.hoehe = { $eq: hoehe.split("_").join(" ") };
          if (tiefe) productFilters.tiefe = { $eq: tiefe.split("_").join(" ") };
          if (delivery)
            productFilters.delivery = { $eq: delivery.split("_").join(" ") };
          if (damen_normalgr)
            productFilters.damen_normalgr = {
              $eq: damen_normalgr.split("_").join(" "),
            };
          if (damen_jeansgr)
            productFilters.damen_jeansgr = {
              $eq: damen_jeansgr.split("_").join(" "),
            };
          if (damen_kurzgr)
            productFilters.damen_kurzgr = {
              $eq: damen_kurzgr.split("_").join(" "),
            };
          if (damen_langgr)
            productFilters.damen_langgr = {
              $eq: damen_langgr.split("_").join(" "),
            };
          if (cup_gr)
            productFilters.cup_gr = { $eq: cup_gr.split("_").join(" ") };
          if (brustumfang)
            productFilters.brustumfang = {
              $eq: brustumfang.split("_").join(" "),
            };
          if (miederhosengr)
            productFilters.miederhosengr = {
              $eq: miederhosengr.split("_").join(" "),
            };
          if (strumpfhosengr)
            productFilters.strumpfhosengr = {
              $eq: strumpfhosengr.split("_").join(" "),
            };
          if (sockengr)
            productFilters.sockengr = { $eq: sockengr.split("_").join(" ") };
          if (herren_normalgr)
            productFilters.herren_normalgr = {
              $eq: herren_normalgr.split("_").join(" "),
            };
          if (herren_jeansgr)
            productFilters.herren_jeansgr = {
              $eq: herren_jeansgr.split("_").join(" "),
            };
          if (kragenweite)
            productFilters.kragenweite = {
              $eq: kragenweite.split("_").join(" "),
            };
          if (herren_untersetztgr)
            productFilters.herren_untersetztgr = {
              $eq: herren_untersetztgr.split("_").join(" "),
            };
          if (herren_schlankgr)
            productFilters.herren_schlankgr = {
              $eq: herren_schlankgr.split("_").join(" "),
            };
          if (waschegr)
            productFilters.waschegr = { $eq: waschegr.split("_").join(" ") };
          if (herren_bauchgr)
            productFilters.herren_bauchgr = {
              $eq: herren_bauchgr.split("_").join(" "),
            };
          if (baby_normalgr)
            productFilters.baby_normalgr = {
              $eq: baby_normalgr.split("_").join(" "),
            };
          if (kinder_normalg)
            productFilters.kinder_normalg = {
              $eq: kinder_normalg.split("_").join(" "),
            };
          if (kinder_sockengr)
            productFilters.kinder_sockengr = {
              $eq: kinder_sockengr.split("_").join(" "),
            };
          if (schuhgr)
            productFilters.schuhgr = { $eq: schuhgr.split("_").join(" ") };
          if (kinder_schuhgr)
            productFilters.kinder_schuhgr = {
              $eq: kinder_schuhgr.split("_").join(" "),
            };
          if (fashion_material)
            productFilters.fashion_material = {
              $eq: fashion_material.split("_").join(" "),
            };
          if (fashion_color)
            productFilters.fashion_color = {
              $eq: fashion_color.split("_").join(" "),
            };
          if (shoes_material)
            productFilters.shoes_material = {
              $eq: shoes_material.split("_").join(" "),
            };
          if (shoes_color)
            productFilters.shoes_color = {
              $eq: shoes_color.split("_").join(" "),
            };
          if (min_sale_price)
            productFilters.sale_price = { $gte: parseFloat(min_sale_price) };
          if (max_sale_price)
            productFilters.sale_price = { $lte: parseFloat(max_sale_price) };

          const productFields = reducedFields
            ? [
                "sale_price",
                "regular_price",
                "delivery",
                "furniture_color",
                "furniture_material",
                "breite",
                "hoehe",
                "tiefe",
                "damen_normalgr",
                "damen_jeansgr",
                "damen_kurzgr",
                "damen_langgr",
                "cup_gr",
                "brustumfang",
                "miederhosengr",
                "strumpfhosengr",
                "sockengr",
                "herren_normalgr",
                "herren_jeansgr",
                "kragenweite",
                "herren_untersetztgr",
                "herren_schlankgr",
                "waschegr",
                "herren_bauchgr",
                "baby_normalgr",
                "kinder_normalg",
                "kinder_sockengr",
                "schuhgr",
                "kinder_schuhgr",
                "fashion_material",
                "fashion_color",
                "shoes_material",
                "shoes_color",
              ]
            : [
                "product_name",
                "regular_price",
                "sale_price",
                "product_image1",
                "product_url",
                "slug",
              ];

          const productPopulate = !reducedFields
            ? {
                shops: {
                  fields: ["id", "name", "slug"], // Include only id, name, and slug for shops relation
                },
                categories: {
                  fields: ["id", "name", "slug"], // Include only id, name, and slug for categories relation
                },
              }
            : {};

          // Fetch products for the current category
          const currentCategory = await strapi.entityService.findOne(
            "api::category.category",
            categoryId,
            {
              populate: {
                products: {
                  filters: productFilters,
                  fields: productFields, // Select specific fields if reducedFields is true
                  populate: productPopulate, // Select specific relations if reducedFields is true
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
              subcategory.id,
              reducedFields
            );
            products.push(...subcategoryProducts);
          }

          return products;
        };

        let allProducts = [];
        // Fetch all products for the category and its subcategories
        if (parseInt(page, 10) === -1) {
          allProducts = await fetchProductsRecursively(category.id, true);
        } else {
          allProducts = await fetchProductsRecursively(category.id);
        }

        if (sales === "true") {
          allProducts = await allProducts.filter(
            (product) => product.sale_price !== product.regular_price
          );
        }

        const countUniqueValues = (field) => {
          return allProducts.reduce((acc, product) => {
            const value = product[field];
            if (value) {
              const key = value; // Handle underscores in filter values
              acc[key] = (acc[key] || 0) + 1;
            }
            return acc;
          }, {});
        };

        // Count unique values for each filter
        const filtersCount = {
          furniture_color: countUniqueValues("furniture_color"),
          furniture_material: countUniqueValues("furniture_material"),
          delivery: countUniqueValues("delivery"),
          breite: countUniqueValues("breite"),
          hoehe: countUniqueValues("hoehe"),
          tiefe: countUniqueValues("tiefe"),
          damen_normalgr: countUniqueValues("damen_normalgr"),
          damen_jeansgr: countUniqueValues("damen_jeansgr"),
          damen_kurzgr: countUniqueValues("damen_kurzgr"),
          damen_langgr: countUniqueValues("damen_langgr"),
          cup_gr: countUniqueValues("cup_gr"),
          brustumfang: countUniqueValues("brustumfang"),
          miederhosengr: countUniqueValues("miederhosengr"),
          strumpfhosengr: countUniqueValues("strumpfhosengr"),
          sockengr: countUniqueValues("sockengr"),
          herren_normalgr: countUniqueValues("herren_normalgr"),
          herren_jeansgr: countUniqueValues("herren_jeansgr"),
          kragenweite: countUniqueValues("kragenweite"),
          herren_untersetztgr: countUniqueValues("herren_untersetztgr"),
          herren_schlankgr: countUniqueValues("herren_schlankgr"),
          waschegr: countUniqueValues("waschegr"),
          herren_bauchgr: countUniqueValues("herren_bauchgr"),
          baby_normalgr: countUniqueValues("baby_normalgr"),
          kinder_normalg: countUniqueValues("kinder_normalg"),
          kinder_sockengr: countUniqueValues("kinder_sockengr"),
          schuhgr: countUniqueValues("schuhgr"),
          kinder_schuhgr: countUniqueValues("kinder_schuhgr"),
          fashion_material: countUniqueValues("fashion_material"),
          fashion_color: countUniqueValues("fashion_color"),
          shoes_material: countUniqueValues("shoes_material"),
          shoes_color: countUniqueValues("shoes_color"),
        };

        if (parseInt(page, 10) === -1) {
          return {
            data: filtersCount,
            price: {
              min: Math.min(
                ...allProducts.map((product) => product.sale_price)
              ),
              max: Math.max(
                ...allProducts.map((product) => product.sale_price)
              ),
            },
            meta: {
              total: allProducts.length,
              page: -1,
              pageSize: allProducts.length,
              totalPages: 1,
            },
          };
        }

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

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + parseInt(pageSize, 10);
        const paginatedEntries = allProducts.slice(startIndex, endIndex);
        return {
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
