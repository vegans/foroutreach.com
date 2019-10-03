'use strict';

/**
 * Sign.js controller
 *
 * @description: A set of functions called "actions" for managing `Sign`.
 */

module.exports = {

  /**
   * Retrieve sign records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.sign.search(ctx.query);
    } else {
      return strapi.services.sign.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a sign record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.sign.fetch(ctx.params);
  },

  /**
   * Count sign records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.sign.count(ctx.query);
  },

  /**
   * Create a/an sign record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.sign.add(ctx.request.body);
  },

  /**
   * Update a/an sign record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.sign.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an sign record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.sign.remove(ctx.params);
  }
};
