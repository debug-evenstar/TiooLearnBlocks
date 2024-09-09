'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react-icons/go');
var resolve = require('@rollup/plugin-node-resolve');
var commonjs = require('@rollup/plugin-commonjs');
var typescript = require('@rollup/plugin-typescript');
var postcss = require('rollup-plugin-postcss');
var dts = require('rollup-plugin-dts');
var rollupPluginTerser = require('rollup-plugin-terser');
var peerDepsExternal = require('rollup-plugin-peer-deps-external');
var url = require('@rollup/plugin-url');
var json = require('@rollup/plugin-json');
var image = require('@rollup/plugin-image');
var postcssUrl = require('postcss-url');
var postcssImport = require('postcss-import');

const Config = [
    {
        input: "src/index.tsx",
        output: [
            {
                file: "dist/cjs/index.js",
                format: "cjs",
                sourcemap: true,
                // inlineDynamicImports: true,
            },
            {
                file: "dist/esm/index.js",
                format: "esm",
                sourcemap: true,
                // inlineDynamicImports: true,
            },
        ],
        plugins: [
            json(),
            peerDepsExternal(),
            resolve(),
            postcssImport(),
            postcssUrl({
                url: 'rebase'
            }),
            commonjs(),
            postcss(),
            typescript({ tsconfig: "./tsconfig.json" }),
            rollupPluginTerser.terser(),
            image(),
            url(),
            // svgr({ icon: true }),
        ],
        external: ["react", "react-dom", "styled-components"],
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [
            dts.default(),
        ],
        external: [/\.css$/]
    },
];

exports.default = Config;
