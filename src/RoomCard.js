import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
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

class RoomCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            openModal1: false,
            openModalBadRes: false,
            checkin: null,
            checkout: null,
            first: null,
            last: null,
            numOccupants: null,
            creditCard: null,
            reservationCode: null,
            errorCode: null,
            nextAvailable: this.props.nextAvailable
        };
        this.postReservation = this.postReservation.bind(this);
        this.changeCheckin = this.changeCheckin.bind(this);
        this.changeCheckout = this.changeCheckout.bind(this);
        this.changeFirst = this.changeFirst.bind(this);
        this.changeLast = this.changeLast.bind(this);
        this.changeNumOccupants = this.changeNumOccupants.bind(this);
        this.changeCreditCard = this.changeCreditCard.bind(this);
        this.getNextAvailable = this.getNextAvailable.bind(this);
    }


    postReservation() {
        let url = "https://myteamql-back.herokuapp.com/reservation";
        console.log(url);
        axios
            .post(url, {
                room: this.props.roomNumber,
                checkIn: this.state.checkin,
                checkOut: this.state.checkout,
                lastName: this.state.last,
                firstName: this.state.first,
                adults: this.state.numOccupants,
                kids: 0,
                crNumber: this.state.creditCard,
            })
            .then((response) => {
                if (response.data.code > 0) {
                    this.setState({
                        reservationCode: response.data.code
                    });
                    this.handleCloseModal();
                    this.handleOpenModal1();
                } else {
                    this.setState({
                        errorCode: response.data.code
                    });
                    this.handleOpenModalBadRes();
                }
            })
            .catch(() => {

            })
    }

    getNextAvailable() {
        let url = "https://myteamql-back.herokuapp.com/reservations/nextavailable/" + this.props.roomNumber;
        console.log(url)
        axios
            .get(url)
            .then((response) => {
                this.setState({
                    nextAvailable: response.data
                })
                this.handleOpenModal();

            })
            .catch(() => {

            })
    }

    changeCheckin(event) {
        this.setState({
            checkin: event.target.value
        })
    }

    changeCheckout(event) {
        this.setState({
            checkout: event.target.value
        })
    }

    changeFirst(event) {
        this.setState({
            first: event.target.value
        })
    }

    changeLast(event) {
        this.setState({
            last: event.target.value
        })
    }

    changeNumOccupants(event) {
        this.setState({
            numOccupants: event.target.value
        })
    }

    changeCreditCard(event) {
        this.setState({
            creditCard: event.target.value
        })
    }

    handleOpenModal = () => {
        this.setState({openModal: true}, () => {
        });
    };

    handleCloseModal = () => {
        this.setState({openModal: false});
    };
    handleOpenModal1 = () => {
        this.setState({openModal1: true});
    };

    handleCloseModal1 = () => {
        this.setState({openModal1: false});
    };
    handleCloseModalBadRes = () => {
        this.setState({
                openModalBadRes: false, checkin: this.props.checkin,
                checkout: this.props.checkout, room: this.props.roomNumber
            },
            () => {

            });
    };

    handleOpenModalBadRes = () => {
        this.setState({openModalBadRes: true},
            () => {
                this.handleCloseModal()
            });
    };

    render() {
        const {classes, theme} = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={8}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src={this.props.pic}/>
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={8}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h5">
                                        Room {this.props.roomNumber}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {this.props.beds} {this.props.type} Beds
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {this.props.decor} Decor
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Max Occupants: {this.props.maxOccupants}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Length: {this.props.length} ft
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Popularity: {this.props.popularity}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={this.getNextAvailable}>
                                        <Typography variant="body2" style={{cursor: 'pointer'}}>
                                            Book Room
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">${this.props.price}/night</Typography>
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
                        <Paper>
                            <div className={classes.paper}>
                                <Typography variant="h6" id="modal-title">
                                    Please fill out this information to complete your reservation.
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Next Available: {this.state.nextAvailable}
                                </Typography>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-name"
                                        label="First Name"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.changeFirst}
                                    />

                                </form>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-name"
                                        label="Last Name"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.changeLast}
                                    />

                                </form>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-name"
                                        label="Credit Card Number"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.changeCreditCard}
                                    />

                                </form>
                                <form className={classes.container} noValidate autoComplete="off">
                                    <TextField
                                        id="outlined-name"
                                        label="Number of Occupants"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.changeNumOccupants}
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
                                            onClick={this.handleCloseModal}>
                                        Cancel
                                    </Button>
                                    <Button size="medium" color="primary" className={classes.margin}
                                            onClick={this.postReservation}>
                                        Reserve
                                    </Button>
                                </Grid>
                            </div>
                        </Paper>
                    </Grid>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openModal1}
                    onClose={this.handleCloseModal1}
                >

                    <Grid container spacing={0} alignItems="center" justify="space-evenly"
                          style={{minHeight: '100vh'}}>
                        <Paper style={{minWidth: '500px'}}>
                            <div className={classes.paper}>
                                <Typography variant="h5" id="modal-title">
                                    Reservation Confirmation
                                </Typography>
                                <Typography variant="body1" id="modal-title">
                                    Reservation Code: {this.state.reservationCode}
                                </Typography>
                                <Typography variant="body1" id="modal-title">
                                    Name: {this.state.first} {this.state.last}
                                </Typography>
                                <Typography variant="body1" id="modal-title">
                                    Room {this.props.roomNumber}
                                </Typography>
                                <Typography variant="body1" id="modal-title">
                                    Checkin: {this.state.checkin}
                                </Typography>
                                <Typography variant="body1" id="modal-title">
                                    Checkout: {this.state.checkout}
                                </Typography>
                                <Typography variant="body1" id="modal-title">
                                    {this.state.numOccupants} Occupants
                                </Typography>


                                <Grid container spacing={0} direction="row" alignItems="center"
                                      justify="center">
                                    <Button size="medium" color="primary" className={classes.margin}
                                            onClick={this.handleCloseModal1}>
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
                                {
                                    this.state.errorCode === -1 ?
                                        <Typography variant="h5" id="modal-title">
                                            Error: Max occupants exceeded
                                        </Typography> :
                                        this.state.errorCode === -2 ?
                                            <Typography variant="h5" id="modal-title">
                                                Error: That room is already booked on those dates
                                            </Typography> :
                                            this.state.errorCode === -3 ?
                                            <Typography variant="h5" id="modal-title">
                                                Error: Invalid credit card number or name
                                            </Typography> :
                                                <Typography variant="h5" id="modal-title">
                                                    Error: Something went wrong
                                                </Typography>
                                }
                                {/*<Typography variant="h5" id="modal-title">*/}
                                {/*    Error: That room is already booked on those dates*/}
                                {/*</Typography>*/}
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

export default withStyles(styles, {withTheme: true})(RoomCard);
