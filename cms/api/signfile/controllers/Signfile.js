'use strict';

/**
 * Signfile.js controller
 *
 * @description: A set of functions called "actions" for managing `Signfile`.
 */

module.exports = {

  /**
   * Retrieve signfile records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.signfile.search(ctx.query);
    } else {
      return strapi.services.signfile.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a signfile record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.signfile.fetch(ctx.params);
  },

  /**
   * Count signfile records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.signfile.count(ctx.query);
  },

  /**
   * Create a/an signfile record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.signfile.add(ctx.request.body);
  },

  /**
   * Update a/an signfile record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.signfile.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an signfile record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.signfile.remove(ctx.params);
  }
};
