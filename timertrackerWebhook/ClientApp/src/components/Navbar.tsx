import { IcecreamOutlined } from "@mui/icons-material";
import {AppBar, Toolbar, IconButton, Typography, Stack, Button} from "@mui/material"
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <AppBar position="static">
        <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                <IcecreamOutlined></IcecreamOutlined>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                
            </Typography>
            <Stack direction="row" spacing={2}>
            <Link to="/"><Button color="inherit">Home</Button></Link>
            <Link to="/about" color="inherit"><Button color="inherit">About</Button></Link>
            <Link to="/contact" color="inherit"><Button color="inherit">Contact</Button></Link>
            <Link to="/cases" color="inherit"><Button color="inherit">Clients</Button></Link>
            <Link to="/timetracking" color="inherit"><Button color="inherit">Timetracking</Button></Link>
            <Link to="/webhookregistration" color="inherit"><Button color="inherit">Webhooks</Button></Link>
        </Stack>
        </Toolbar>
    </AppBar>
  )
}

export { Navbar };
