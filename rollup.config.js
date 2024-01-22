import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from 'rollup-plugin-postcss'
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import svgr from '@svgr/rollup'
import url from '@rollup/plugin-url'
import json from '@rollup/plugin-json';

const Config = [
    {
        input: "src/index.tsx",
        output: [
            {
                file: "dist/cjs/index.js",
                format: "cjs",
                sourcemap: true,
            },
            {
                file: "dist/esm/index.js",
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            json(),
            peerDepsExternal(),
            resolve(),
            commonjs(),
            postcss(),
            typescript({ tsconfig: "./tsconfig.json" }),
            terser(),
            url(), svgr({ icon: true }),
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

export default Config;
