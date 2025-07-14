// // postcss.config.mjs
// import tailwindcss from "tailwindcss";
// import autoprefixer from "autoprefixer";

// const config = {
//   plugins: [tailwindcss, autoprefixer],
// };

// export default config;

// postcss.config.mjs
// const config = {
//   plugins: ["@tailwindcss/postcss", "autoprefixer"],
// };

// export default config;

module.exports = {
  plugins: ["@tailwindcss/postcss", "autoprefixer"],
};
