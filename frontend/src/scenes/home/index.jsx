import React from 'react';

import { AppBar, Toolbar, Typography, Button, Container, Grid } from '@mui/material';
import { tokens } from "../../theme";
import { ArrowRightAlt, Star } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import AirIcon from '@mui/icons-material/Air';
import CloudIcon from '@mui/icons-material/Cloud';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { Box, padding } from '@mui/system';


const Image = styled('img')({
    borderRadius: '0.25rem',
    width: '100%',
    minHeight: '300px',
    objectFit: 'cover',
  });

function Home() {
  const colors = tokens("light");

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
            Health Advice Group
          </Typography>
            <Button href="/" color="inherit">Home</Button>
            <Button href="#about" color="inherit">About</Button>
            <Button href="#about" color="inherit">Contact</Button>
            <Button href="/login" color="inherit">Login</Button>
          <Button href="/register" color="inherit">Get Started</Button>
        </Toolbar>
      </AppBar>

        <div style={{ backgroundColor: colors.primary[400], height: "100vh", width: "100vw", backgroundImage: "url(https://fastly.picsum.photos/id/925/1920/1080.jpg?hmac=MvDc24-GpBiaSH0W_e1Fn4XwJN5lWDeV82UCCv0ofRg)", backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100vh", width: "100vw" }}>

                <Typography variant="h1" color={"white"}>
                    Health Advice Group
                </Typography>
                
                <Typography variant="h4" color={"white"}>
                giving free advice and tools to help you on environmental health conditions
                </Typography>

                <Button variant="contained" color="primary" style={{ marginTop: "20px" }}>
                    Get Started
                </Button>

            </div>
            <div style={{ height: '4rem' }} />

    
            <Container sx={{ py: { xs: 4, xl: 5 } }}>
  <Grid container spacing={4} justifyContent="center">
    <Grid item xs={12} md={8} xl={6} textAlign="center">
      <Typography variant="h1" gutterBottom>
        What We Offer
      </Typography>
      <Typography variant="h4" sx={{ width: { lg: '50%' }, margin: '0 auto' }}>
        We offer a variety of services to help you with your environmental health conditions.
      </Typography>
    <div style={{ height: '4rem' }} />

    </Grid>
    </Grid>
    <Grid container spacing={4} justifyContent="center">

    <Grid item xs={12} md={6} xl={4}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AirIcon sx={{ fontSize: '4.5rem', color: 'primary.secondary' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom>
            Weather Forecasting
          </Typography>
          <Typography variant="h4" gutterBottom>
            We provide weather forecasting for your area, so you can plan ahead.
          </Typography>
          <a href="/dashboard" style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
            Learn More
            <ArrowRightAlt style={{ marginLeft: '0.5rem' }} />
          </a>
        </div>
      </div>
    </Grid>
    <Grid item xs={12} md={6} xl={4}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CloudIcon sx={{ fontSize: '4.5rem', color: 'primary.secondary' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom>
            Air Quality Monitoring
          </Typography>
          <Typography variant="h4" gutterBottom>
            Our service provides air quality monitoring for your area.
          </Typography>
          <a href="#" variant="h4" style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
            Learn More
            <ArrowRightAlt style={{ marginLeft: '0.5rem' }} />
          </a>
        </div>
      </div>
    </Grid>
    <Grid item xs={12} md={6} xl={4}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <MonitorHeartIcon sx={{ fontSize: '4.5rem', color: 'primary.secondary' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom>
            Personalized health advice
          </Typography>
          <Typography variant="h4" gutterBottom>
            We provide personalized health advice tailored to your needs,
            depending on your location and health conditions.
          </Typography>
          <a href="#" style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
            Learn More
            <ArrowRightAlt style={{ marginLeft: '0.5rem' }} />
          </a>
        </div>
      </div>
    </Grid>
  </Grid>
</Container>

<div style={{ height: '16rem' }} />

<Container sx={{ py: { xs: 4, xl: 5 } }}>
      <Grid container spacing={{ xs: 4, md: 0 }}>
        <Grid item md={6}>
          <div sx={{ p: { xl: 5 }, m: { xl: 5 } }}>
            <Image src="https://fastly.picsum.photos/id/930/1400/800.jpg?hmac=SLPevf1dVjFybxD_YCLOUM5h0rASeBjHIQxyOy8-zA8" />
          </div>
        </Grid>
        
        <Grid item md={6} sx={{ display: 'flex', alignItems: 'center',}}>
          <div sx={{ maxWidth: 350 }} style={{paddingLeft: "24px"}}>
            <Typography variant="h1" fontWeight="bold" sx={{ textTransform: 'uppercase' }}>
                What We Do
            </Typography>
            <Typography variant="h3" sx={{ my: 3 }}>
                We provide a variety of services to help you with your environmental health conditions.
                Do you have a health condition that is affected by the environment? We can help you.
                
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Container>

    <div style={{ height: '16rem' }} />

    {/* about us section */}
    <Container sx={{ py: { xs: 4, xl: 5 } }} id={"about"}>
        <Grid container spacing={{ xs: 4, md: 0 }}>
            <Grid item md={6} sx={{ display: 'flex', alignItems: 'center',}}>
                <div sx={{ maxWidth: 350 }} style={{paddingLeft: "24px"}}>
                    <Typography variant="h1" fontWeight="bold" sx={{ textTransform: 'uppercase' }}>
                        About Us
                    </Typography>
                    <Typography variant="h3" sx={{ my: 3 }}>
                    At Health Advice Group, we are committed to promoting a healthy and safe environment for everyone. Our focus is on providing comprehensive solutions to environmental health challenges, including air and water quality, food safety, and hazardous waste management. We believe that a clean and healthy environment is essential to a vibrant and thriving community.
                    </Typography>
                    <Button variant="contained" sx={{ mr: 6 }}>Get Started</Button>
                </div>
            </Grid>
            <Grid item md={6}>
                <div sx={{ p: { xl: 5 }, m: { xl: 5 } }}>
                    <Image src="https://fastly.picsum.photos/id/797/1400/800.jpg?hmac=o517T6HyEqIvLjMGwIOZXXZfTnueS-nbfLmuj1KzXVw" />
                </div>
            </Grid>
        </Grid>
    </Container>

    <div style={{ height: '16rem' }} />

    <footer >
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Some additional text to describe the footer.
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary">
          © {new Date().getFullYear()} Health Advice Group
        </Typography>
      </Container>
    </footer>
           
        </div>


    </div>

  );
}

export default Home;