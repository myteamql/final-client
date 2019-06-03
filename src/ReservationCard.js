import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import axios from "axios";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: '10px',
        margin: 'auto',
        maxWidth: '80%',
        minHeight: 300,
        marginTop: '20px'
    },
    image: {
        width: 300,
        height: 300,
    },
    img: {
        marginLeft: '50px',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
});



function ReservationCard(props) {


    const { classes } = props;
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={8}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={props.pic} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={8}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h5">
                                    Room {props.roomNumber}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {props.adults} Adults
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {props.kids} Kids
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Check In: {props.checkin}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Check Out: {props.checkout}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Cancelled? {props.canceled ? "True" : "False"}
                                </Typography>
                                <Button variant="contained" style={{margin: "10px"}}>
                                    Cancel Reservation
                                </Button>
                                <Button variant="contained">
                                    Change Reservation
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

ReservationCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReservationCard);