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

const config = {
    mode: "jit",
    purge: {
        content: ["./src/**/*.{html,js,svelte,ts}"],
        safelist
    },
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
