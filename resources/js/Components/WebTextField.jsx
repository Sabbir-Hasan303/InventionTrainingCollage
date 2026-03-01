import React from 'react';
import { TextField } from '@mui/material';

const PALETTE = {
    dark: {
        inputBg: 'rgba(255,255,255,0.02)',
        text: '#ffffff',
        placeholder: 'rgba(255,255,255,0.6)',
        label: 'rgba(255,255,255,0.65)',
        border: 'rgba(255,255,255,0.2)',
        hoverBorder: 'rgba(255,255,255,0.4)',
        focusBorder: '#4ECDC4',
        autofillBg: '#161719',
    },
    light: {
        inputBg: '#ffffff',
        text: '#111827',
        placeholder: '#6b7280',
        label: '#4b5563',
        border: '#d1d5db',
        hoverBorder: '#9ca3af',
        focusBorder: '#1f2937',
        autofillBg: '#ffffff',
    },
};

export default function WebTextField({
    mode = 'light',
    fullWidth = true,
    variant = 'outlined',
    focusColor,
    customSx = {},
    ...rest
}) {
    const colors = mode === 'dark' ? PALETTE.dark : PALETTE.light;
    const resolvedFocusColor = focusColor || colors.focusBorder;

    const baseSx = {
        '& .MuiOutlinedInput-root': {
            backgroundColor: colors.inputBg,
            color: colors.text,
            boxShadow: 'none !important',
            '--tw-ring-offset-shadow': '0 0 #0000',
            '--tw-ring-shadow': '0 0 #0000',
            '--tw-shadow': '0 0 #0000',
            '--tw-ring-color': 'transparent',
            '--tw-ring-offset-color': 'transparent',
            '& fieldset': {
                borderColor: colors.border,
            },
            '&:hover fieldset': {
                borderColor: colors.hoverBorder,
            },
            '&.Mui-focused fieldset': {
                borderColor: resolvedFocusColor,
            },
            '&.Mui-focused': {
                boxShadow: 'none !important',
                '--tw-ring-offset-shadow': '0 0 #0000',
                '--tw-ring-shadow': '0 0 #0000',
                '--tw-shadow': '0 0 #0000',
            },
        },
        '& .MuiInputLabel-root': {
            color: colors.label,
            '&.Mui-focused': {
                color: resolvedFocusColor,
            },
        },
        '& .MuiInputBase-input': {
            color: colors.text,
            outline: 'none',
            boxShadow: 'none !important',
            '--tw-ring-offset-shadow': '0 0 #0000',
            '--tw-ring-shadow': '0 0 #0000',
            '--tw-shadow': '0 0 #0000',
            '--tw-ring-color': 'transparent',
            '--tw-ring-offset-color': 'transparent',
            '&::placeholder': {
                color: colors.placeholder,
                opacity: 1,
            },
            '&:focus': {
                outline: 'none',
                boxShadow: 'none !important',
                '--tw-ring-offset-shadow': '0 0 #0000',
                '--tw-ring-shadow': '0 0 #0000',
                '--tw-shadow': '0 0 #0000',
            },
            '&:-webkit-autofill': {
                WebkitBoxShadow: `0 0 0 1000px ${colors.autofillBg} inset !important`,
                WebkitTextFillColor: `${colors.text} !important`,
            },
            '&:-webkit-autofill:hover': {
                WebkitBoxShadow: `0 0 0 1000px ${colors.autofillBg} inset !important`,
                WebkitTextFillColor: `${colors.text} !important`,
            },
            '&:-webkit-autofill:focus': {
                WebkitBoxShadow: `0 0 0 1000px ${colors.autofillBg} inset !important`,
                WebkitTextFillColor: `${colors.text} !important`,
            },
        },
        '& .MuiInputAdornment-root, & .MuiSvgIcon-root': {
            color: mode === 'dark' ? 'rgba(255,255,255,0.55)' : '#6b7280',
        },
    };

    return (
        <TextField
            variant={variant}
            fullWidth={fullWidth}
            sx={[baseSx, customSx]}
            {...rest}
        />
    );
}
