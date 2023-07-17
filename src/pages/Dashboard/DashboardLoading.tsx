import { Grid ,Skeleton} from '@mui/material'
import React from 'react'

export default function DashboardLoading() {
  return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Skeleton animation="wave" height={30}>

                    </Skeleton>

                </Grid>

                <Grid item xs={12} md={8}>
                <Skeleton  
                        variant="rectangular"
                        animation="wave"
                        height={190}>

                </Skeleton>

                </Grid>

                

                <Grid item xs={12} md={4}>
                <Skeleton  
                        variant="rectangular"
                        animation="wave"
                        height={190}
                        
                        >

                </Skeleton>

                </Grid>

                <Grid item xs={12} md={8}>
                <Skeleton  
                        variant="rectangular"
                        animation="wave"
                        height={300}>

                </Skeleton>

                </Grid>

                <Grid item xs={12} md={4}>
                <Skeleton  
                        variant="rectangular"
                        animation="wave"
                        height={300}>

                </Skeleton>

                </Grid>

                


            </Grid>
    )
}
