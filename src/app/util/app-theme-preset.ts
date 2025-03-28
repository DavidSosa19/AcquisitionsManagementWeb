import { definePreset } from '@primeng/themes';
import Material from '@primeng/themes/material';

const Noir = definePreset(Material, {
    semantic: {
        colorScheme: {
            light: {
                primary: {
                    color: '#273656', // Cyan
                    inverseColor: '#ffffff', // White
                    hoverColor: '#4E67B5', // Lighter cyan
                    activeColor: '#009C9A' // Darker cyan
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