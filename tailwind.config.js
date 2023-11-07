/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
const aspectRatioReq = require('@tailwindcss/aspect-ratio')

module.exports = {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        },
    },
    variants: {},
    corePlugins: {
        aspectRatio: false,
    },
    plugins: [
        require('@tailwindcss/forms'),
        aspectRatioReq,
        function ({ addVariant }) {
            addVariant('important', ({ container }) => {
                container.walkRules((rule) => {
                    rule.selector = `.\\!${rule.selector.slice(1)}`
                    rule.walkDecls((decl) => {
                        decl.important = true
                    })
                })
            })
        },
    ],
}
