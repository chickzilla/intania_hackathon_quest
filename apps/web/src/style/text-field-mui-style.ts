export const textFieldWhiteStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'gray', // Change border color to white
        backgroundColor: 'transparent',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'orange', // Change border color when focused
      },
    },
    '& input': {
        fontSize: '0.85rem', // Adjust font size if needed
      },
    '& .MuiInputLabel-root': {
      color: 'gray', // Change label color to white
      '&.Mui-focused': {
        color: 'orange', // Ensure label color is white when focused
      },

    },

  }