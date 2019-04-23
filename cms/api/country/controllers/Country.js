'use strict';

/**
 * Country.js controller
 *
 * @description: A set of functions called "actions" for managing `Country`.
 */

module.exports = {

  /**
   * Retrieve country records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.country.search(ctx.query);
    } else {
      return strapi.services.country.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a country record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.country.fetch(ctx.params);
  },

  /**
   * Count country records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.country.count(ctx.query);
  },

  /**
   * Create a/an country record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.country.add(ctx.request.body);
  },

  /**
   * Update a/an country record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.country.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an country record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.country.remove(ctx.params);
  }
};
