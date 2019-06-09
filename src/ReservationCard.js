import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

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



class ReservationCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            canceled: this.props.canceled,
            openModal: false,
            openModalChange: false,
            openModalAfterChange: false,
            openModalBadRes: false,
            checkin: this.props.checkin,
            checkout: this.props.checkout,
            room: this.props.roomNumber
        }
        this.cancelReservation = this.cancelReservation.bind(this);
        this.putReservation = this.putReservation.bind(this);
        this.changeCanceled = this.changeCanceled.bind(this);
        this.changeCheckin = this.changeCheckin.bind(this);
        this.changeCheckout = this.changeCheckout.bind(this);
        this.changeRoom = this.changeRoom.bind(this);
    }

    cancelReservation() {
        let url = "http://localhost:8080/reservation/cancel/" + this.props.code;
        console.log(url);
        axios
            .put(url)
            .then((response) => {
                const canceled = response.data
                this.setState({
                    canceled
                });
            })
            .catch(() => {

            })
    }

    putReservation() {
        let url = "http://localhost:8080/reservation/" + this.props.code + "/" + this.state.checkin + "/" +
            this.state.checkout + "/" + this.state.room;
        console.log(url);
        axios
            .put(url)
            .then((response) => {
                const changed = response.data
                console.log("then")
                if(response.data != ""){
                    this.handleOpenModalAfterChange()
                }else{
                    this.handleOpenModalBadRes()
                }

            })
            .catch(() => {
                console.log("catch")

            })
    }
    changeCheckin(event) {
        this.setState({
            checkin: event.target.value
        }, ()=> {
            console.log("changed check in")
        })
    }
    changeCheckout(event) {
        this.setState({
            checkout: event.target.value
        })
    }
    changeRoom(event) {
        this.setState({
            room: event.target.value
        }, ()=> {
            console.log("changed room")
        })
    }


    changeCanceled(event) {
        this.setState({
            canceled: event.target.value
        }, () => {
            this.cancelReservation();
            console.log("set state");
        })
    }
    handleOpenModal = () => {
        this.setState({openModal: true},
            () => {
                this.cancelReservation();
            });
    };

    handleCloseModal = () => {
        this.setState({openModal: false},
            () => {

        });
    };
    handleOpenModalChange = () => {
        this.setState({openModalChange: true},
            () => {

            });
    };

    handleCloseModalChange = () => {
        this.setState({openModalChange: false},
            () => {

            });
    };
    handleOpenModalAfterChange = () => {
        this.setState({openModalAfterChange: true},
            () => {
                this.handleCloseModalChange()
            });
    };

    handleCloseModalAfterChange = () => {
        this.setState({openModalAfterChange: false},
            () => {

            });
    };
    handleCloseModalBadRes = () => {
        this.setState({openModalBadRes: false, checkin: this.props.checkin,
                checkout: this.props.checkout, room: this.props.roomNumber},
            () => {

            });
    };

    handleOpenModalBadRes = () => {
        this.setState({openModalBadRes: true},
            () => {
                this.handleCloseModalChange()
            });
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={8}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src={this.props.picture}/>
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={8}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h5">
                                        Room {this.state.room}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {this.props.adults} Adults
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {this.props.kids} Kids
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Check In: {this.state.checkin}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Check Out: {this.state.checkout}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {this.state.canceled ? "Cancelled" : ""}
                                    </Typography>
                                    {this.state.canceled ?
                                        <Button variant="contained"
                                                disabled
                                                style={{margin: "10px"}}>
                                            Cancel Reservation
                                        </Button> :
                                        <Button variant="contained"
                                                style={{margin: "10px"}}
                                                onClick={this.handleOpenModal}>
                                            Cancel Reservation
                                        </Button>
                                    }
                                    {this.state.canceled ?
                                        <Button variant="contained"
                                                disabled>
                                            Change Reservation
                                        </Button> :
                                        <Button variant="contained"
                                                onClick={this.handleOpenModalChange}>
                                            Change Reservation
                                        </Button>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openModal}
                    onClose={this.handleCloseModal}
                >

                    <Grid container spacing={0} alignItems="center" justify="space-evenly"
                          style={{minHeight: '100vh'}}>
                        <Paper style={{minWidth: '500px'}}>
                            <div className={classes.paper}>
                                <Typography variant="h5" id="modal-title">
                                    Reservation Canceled
                                </Typography>
                                <Typography gutterBottom variant="h5">
                                    Room {this.state.room}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {this.props.adults} Adults
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {this.props.kids} Kids
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Check In: {this.state.checkin}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Check Out: {this.state.checkout}
                                </Typography>
                                <Grid container spacing={0} direction="row" alignItems="center"
                                      justify="center">
                                    <Button size="medium" color="primary" className={classes.margin}
                                            onClick={this.handleCloseModal}>
                                        OK
                                    </Button>

                                </Grid>
                            </div>
                        </Paper>
                    </Grid>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openModalChange}
                    onClose={this.handleCloseModalChange}
                >

                    <Grid container spacing={0} alignItems="center" justify="space-evenly"
                          style={{minHeight: '100vh'}}>
                        <Paper>
                            <div className={classes.paper}>
                                <Typography variant="h6" id="modal-title">
                                    Please fill out this information to change your reservation.
                                </Typography>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-name"
                                        label="Room"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.room}
                                        onChange={this.changeRoom}
                                    />
                                </form>
                                <form noValidate>
                                    <TextField
                                        id="date"
                                        label="Check In"
                                        type="date"
                                        value={this.state.checkin}
                                        onChange={this.changeCheckin}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>
                                <form noValidate>
                                    <TextField
                                        id="date"
                                        label="Check Out"
                                        type="date"
                                        value={this.state.checkout}
                                        onChange={this.changeCheckout}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>
                                <Grid container spacing={0} direction="row" alignItems="center"
                                      justify="center">
                                    <Button size="medium" color="primary" className={classes.margin}
                                            onClick={this.handleCloseModalChange}>
                                        Cancel
                                    </Button>
                                    <Button size="medium" color="primary" className={classes.margin}
                                            onClick={this.putReservation}>
                                        Change Reservation
                                    </Button>
                                </Grid>
                            </div>
                        </Paper>
                    </Grid>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openModalAfterChange}
                    onClose={this.handleCloseModalAfterChange}
                >

                    <Grid container spacing={0} alignItems="center" justify="space-evenly"
                          style={{minHeight: '100vh'}}>
                        <Paper style={{minWidth: '500px'}}>
                            <div className={classes.paper}>
                                <Typography variant="h5" id="modal-title">
                                    Reservation changed
                                </Typography>
                                <Typography gutterBottom variant="h5">
                                    Room {this.state.room}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Check In: {this.state.checkin}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Check Out: {this.state.checkout}
                                </Typography>
                                <Grid container spacing={0} direction="row" alignItems="center"
                                      justify="center">
                                    <Button size="medium" color="primary" className={classes.margin}
                                            onClick={this.handleCloseModalAfterChange}>
                                        OK
                                    </Button>

                                </Grid>
                            </div>
                        </Paper>
                    </Grid>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openModalBadRes}
                    onClose={this.handleCloseModalBadRes}
                >

                    <Grid container spacing={0} alignItems="center" justify="space-evenly"
                          style={{minHeight: '100vh'}}>
                        <Paper style={{minWidth: '500px'}}>
                            <div className={classes.paper}>
                                <Typography variant="h5" id="modal-title">
                                    Error: That room is already booked on those dates
                                </Typography>
                                <Grid container spacing={0} direction="row" alignItems="center"
                                      justify="center">
                                    <Button size="medium" color="primary" className={classes.margin}
                                            onClick={this.handleCloseModalBadRes}>
                                        OK
                                    </Button>

                                </Grid>
                            </div>
                        </Paper>
                    </Grid>
                </Modal>
            </div>
        );
    }
}

ReservationCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReservationCard);