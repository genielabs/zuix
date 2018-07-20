/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "app/content/api/api_template.css",
    "revision": "61474ac5fc5b338a98f960811cd01194"
  },
  {
    "url": "app/content/api/api_template.html",
    "revision": "e969389732c602102897181a8496b1ad"
  },
  {
    "url": "app/content/api/api_template.js",
    "revision": "31ebcceb3611dbe0a5cb429831485e4c"
  },
  {
    "url": "app/content/api/data/ComponentCache.json",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/content/api/data/ComponentContext.json",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/content/api/data/ContextController.json",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/content/api/data/Localizer.json",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/content/api/data/Zuix.json",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/content/api/data/ZxQuery.json",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/content/docs/examples/alice/ch_1.html",
    "revision": "d9d4ff89ee70a4e1037ff19443beccfa"
  },
  {
    "url": "app/content/docs/examples/alice/ch_2.html",
    "revision": "4c1e365cf8d994c6cee8519dc6b02033"
  },
  {
    "url": "app/content/docs/examples/alice/ch_3.html",
    "revision": "3735692dc8f9a88ebf9d569baeb06cb7"
  },
  {
    "url": "app/content/docs/examples/links.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/content/docs/examples/links.html",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/templates/mdl_card.css",
    "revision": "a64525215fefa93fb3c2fe40c48bea02"
  },
  {
    "url": "app/templates/mdl_card.html",
    "revision": "ecaa9aeb44f0e845c1f42a641f02b45c"
  },
  {
    "url": "config.js",
    "revision": "b3f927651bc0af878c86cbcb5e980b50"
  },
  {
    "url": "css/flex-layout-attribute.min.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "index.css",
    "revision": "f70a81e828c7a01c4c264922a12d2101"
  },
  {
    "url": "index.html",
    "revision": "76c4ce21f7739954ce87e57fa47361ec"
  },
  {
    "url": "index.js",
    "revision": "abbbb062d9422e05520ecd6284997de0"
  },
  {
    "url": "js/animate-3.5.2.min.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "js/mdl/material.css",
    "revision": "57313781c72269db589ebea903725dcc"
  },
  {
    "url": "js/mdl/material.js",
    "revision": "d4d04abe369dc10ce86e42c00ee62ccd"
  },
  {
    "url": "js/mdl/material.min.css",
    "revision": "8ce4631006b601c6253396365879a7a9"
  },
  {
    "url": "js/mdl/material.min.js",
    "revision": "df211fcb13a5c100eeb182f14fd37b44"
  },
  {
    "url": "js/prism/clipboard.min.js",
    "revision": "3e5e0fa949e0e7c5ed5fed7b4cc0ee00"
  },
  {
    "url": "js/prism/prism.css",
    "revision": "485c9fc9787ea73d7c802822096c5dfe"
  },
  {
    "url": "js/prism/prism.js",
    "revision": "dac215c15573fb5907885ef1094829fa"
  },
  {
    "url": "js/showdown.min.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "js/zuix-bundler.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "js/zuix-bundler.min.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "js/zuix.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "js/zuix.min.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "js/zuix/zuix-bundler.js",
    "revision": "d58ff2644f64acef00ac316afcb47044"
  },
  {
    "url": "js/zuix/zuix-bundler.min.js",
    "revision": "17cb1cc49a73b499768d27f10e762875"
  },
  {
    "url": "js/zuix/zuix.js",
    "revision": "f4c422d29df4207d696d185e4ca4bdc3"
  },
  {
    "url": "js/zuix/zuix.min.js",
    "revision": "2724e83dfdf0d7fc23aa4ab12821535a"
  },
  {
    "url": "app/content/docs/examples/alice/img/ch_1_1.png",
    "revision": "f13e634f4f4767f426a791ddf85ba9b0"
  },
  {
    "url": "app/content/docs/examples/alice/img/ch_1_2.png",
    "revision": "a40e24033ce25edb5169d5f50a1783d7"
  },
  {
    "url": "app/content/docs/examples/alice/img/ch_1_3.png",
    "revision": "9325671498a60f3e05c6bfdcb6001bac"
  },
  {
    "url": "app/content/docs/examples/alice/img/ch_2_1.png",
    "revision": "ffd9b2ce17eb5cf4b6e0c2e88128e7bc"
  },
  {
    "url": "app/content/docs/examples/alice/img/ch_2_2.png",
    "revision": "c0aa4864727b53a82614fb098c286bca"
  },
  {
    "url": "app/content/docs/examples/alice/img/ch_2_3.png",
    "revision": "45b8f2b32fa463cbbf478693354bb676"
  },
  {
    "url": "app/content/docs/examples/alice/img/ch_2_4.png",
    "revision": "5175980071714ec946d815b4180b23bc"
  },
  {
    "url": "app/content/docs/examples/alice/img/ch_3_1.png",
    "revision": "0b58afb90669a0c00dd796f64872b141"
  },
  {
    "url": "app/content/docs/examples/alice/img/ch_3_2.png",
    "revision": "6f21a396f2c8b7f3a5a884dc9a8932c0"
  },
  {
    "url": "app/content/docs/examples/images/avatar_01.png",
    "revision": "8b86e5f8249828163a0d7e9f6d315dce"
  },
  {
    "url": "app/content/docs/examples/images/avatar_02.png",
    "revision": "8a011d6e36c3b968241ac4331cd03aad"
  },
  {
    "url": "app/content/docs/examples/images/avatar_03.png",
    "revision": "57f804786860e3d1166d0905651efed2"
  },
  {
    "url": "app/content/docs/examples/images/card_cover_2.jpg",
    "revision": "7988b42acee615124d83c43f3f34c02b"
  },
  {
    "url": "app/content/docs/examples/images/card_cover.jpg",
    "revision": "056b0eb64ac30441bd6aca8e3798286b"
  },
  {
    "url": "app/content/docs/examples/images/card_placeholder.jpg",
    "revision": "67f0870f50d4008e45eca50cd43e50bf"
  },
  {
    "url": "app/content/docs/examples/images/cover_javascript.jpg",
    "revision": "86f9d6c2b7e0bf1703681ada474a313d"
  },
  {
    "url": "app/content/docs/examples/images/cover_recipes.jpg",
    "revision": "6b19a1781bc4e0ca2d71e843ec7ad38e"
  },
  {
    "url": "images/api.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/documentation.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/example_picture.jpg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/image_place_holder.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/wallpaper.jpg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/zuix_web_starter.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg)$/, workbox.strategies.cacheFirst({ cacheName: "images", plugins: [new workbox.expiration.Plugin({"maxEntries":50,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/\.(?:html|json|js|css)$/, workbox.strategies.cacheFirst({ cacheName: "default", plugins: [new workbox.expiration.Plugin({"maxEntries":50,"purgeOnQuotaError":false})] }), 'GET');