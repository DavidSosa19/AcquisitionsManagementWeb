import { definePreset } from '@primeng/themes';
import Material from '@primeng/themes/material';

const Noir = definePreset(Material, {
    semantic: {
        primary: {
            50: '#e0f7fa',
            100: '#b2ebf2',
            200: '#80deea',
            300: '#4dd0e1',
            400: '#26c6da',
            500: '#00bcd4',
            600: '#00acc1',
            700: '#0097a7',
            800: '#00838f',
            900: '#006064',
            950: '#004d40'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '#00bcd4', // Cyan
                    inverseColor: '#ffffff', // White
                    hoverColor: '#26c6da', // Lighter cyan
                    activeColor: '#00838f' // Darker cyan
                },
                highlight: {
                    background: '#ffffff', // White
                    focusBackground: '#e0f7fa', // Very light cyan
                    color: '#00bcd4', // Cyan
                    focusColor: '#00acc1' // Slightly darker cyan
                }
            }
        }
    }
});

export default Noir;