const cssnano = require("cssnano")

const mode = process.env.NODE_ENV
const dev = mode === "development"

const config = {
    plugins: [
        require("tailwindcss/nesting"),
        require("tailwindcss"),
        //But others, like autoprefixer, need to run after,
        require("autoprefixer"),
        !dev &&
            cssnano({
                preset: "default"
            })
    ]
}

module.exports = config
