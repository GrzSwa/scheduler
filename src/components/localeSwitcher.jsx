import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import '../styles/localeSwitcherStyle.css'

const LocaleSwitcher = ({ currentLocale, onLocaleChange }) => (
    <div className='container'>
        <div className='text'>
            {currentLocale == "pl-PL" ? "Język:" : "Locale:"}
            &nbsp;&nbsp;
            <TextField
                select
                variant="standard"
                value={currentLocale}
                onChange={(event) => onLocaleChange(event.target.value)}
            >
                <MenuItem value="pl-PL">Polski</MenuItem>
                <MenuItem value="en-US">English</MenuItem>
            </TextField>
        </div>
    </div>
);

export default LocaleSwitcher;
