module.exports = {
    content: ['./public/index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            boxShadow: {
                'solid-black': '0px 6px 0px 0px rgba(8, 9, 12)',
                'solid-gray': '0px 6px 0px 0px rgba(108, 141, 157)',
                'solid-yellow': '0px 6px 0px 0px rgba(192, 129, 12)',
                'solid-cyan': '0px 6px 0px 0px rgba(33, 131, 127)',
            },

            colors: {
                black: {
                    500: '#292D3D',
                    600: '#191B24',
                    700: '#08090C',
                },
                cyan: {
                    500: '#31C3BE',
                    600: '#21837F',
                },
                gray: {
                    400: '#A8BEC9',
                    500: '#6c8d9d',
                },
                yellow: {
                    500: '#F2B237',
                },
            },
        },
    },
    plugins: [],
};
