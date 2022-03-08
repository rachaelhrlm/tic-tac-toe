module.exports = {
    content: ['./public/index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            boxShadow: {
                'solid-black': '0px 8px 0px 0px rgba(8, 9, 12)',
                'solid-gray': '0px 4px 0px 0px rgba(84, 110, 122)',
                'solid-pink': '0px 4px 0px 0px rgba(173, 20, 87)',
                'solid-cyan': '0px 4px 0px 0px rgba(0, 131, 143)',
            },

            colors: {
                black: {
                    500: '#292D3D',
                    600: '#191B24',
                    700: '#08090C',
                },
                gray: {
                    300: '#CED4DE',
                    400: '#A9B4C6',
                    500: '#8594ad',
                },
            },
        },
    },
    plugins: [],
};
