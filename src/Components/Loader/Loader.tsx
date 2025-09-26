import { Box, CircularProgress, Typography } from "@mui/material"

const Loader = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column', gap: 1, height: '100%' }}>
            <CircularProgress />
            <Typography>Loading...</Typography>
        </Box>
    )
}

export default Loader