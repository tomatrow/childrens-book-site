const fs = require("fs")

const colors = JSON.parse(fs.readFileSync("./src/lib/data/colors.json"))

function prefixColors(prefix) {
    return Object.keys(colors).map(color => `${prefix}${color}`)
}

const safelist = [
    ...prefixColors("bg-"),
    ...prefixColors("hover:bg-"),
    ...prefixColors("border-"),
    ...prefixColors("text-")
]

fs.writeFileSync("./safelist.txt", JSON.stringify(safelist))

const config = {
    mode: "jit",
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "./node_modules/3d-book-svelte/**/*.{html,js,svelte,ts,css}",
        "./node_modules/optional-default-floaty-sveltekit-theme/**/*.{html,js,svelte,ts,css}",
        "./safelist.txt"
    ],
    theme: {
        extend: {
            colors,
            screens: {
                desktop: "1000px"
            },
            letterSpacing: {
                ultra: "0.3rem"
            }
        }
    },
    plugins: [require("@tailwindcss/typography"), require("@tailwindcss/aspect-ratio")]
}

module.exports = config
