const colors = require("tailwindcss/colors");

module.exports = {
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        colors: {
            black: colors.black,
            white: colors.white,
            bluegray: colors.blueGray,
            coolgray: colors.coolGray,
            gray: colors.gray,
            truegray: colors.trueGray,
            warmgray: colors.warmGray,
            red: colors.red,
            orange: colors.orange,
            amber: colors.amber,
            yellow: colors.yellow,
            lime: colors.lime,
            green: colors.green,
            emerald: colors.emerald,
            teal: colors.teal,
            cyan: colors.cyan,
            lightblue: colors.lightBlue,
            blue: colors.lightBlue,
            indigo: colors.indigo,
            violet: colors.violet,
            purple: colors.purple,
            fuchsia: colors.fuchsia,
            pink: colors.pink,
            rose: colors.rose,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
