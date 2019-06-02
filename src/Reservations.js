import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'rc-slider/assets/index.css';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ReservationCard from './ReservationCard';

export default class UserReservations extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            firstname: 'null',
            lastname: 'null',
            reservations: []
        };

        this.changeFirstname = this.changeFirstname.bind(this);
        this.changeLastname = this.changeLastname.bind(this);
        this.getUserReservations = this.getUserReservations.bind(this);
    }

    changeFirstname(event) {
        this.setState({
            firstname: event.target.value
        }, () =>{
            this.getUserReservations();
        })
    }

    changeLastname(event) {
        this.setState({
            lastname: event.target.value
        }, () =>{
            this.getUserReservations();
        })
    }

    getUserReservations() {
        let url = "http://localhost:8080/reservations" + this.firstname + "/" + this.lastname;
        console.log(url);
        axios
            .get(url)
            .then((response) => {
                const reservations = response.data
                this.setState({
                    reservations
                });
            })
            .catch(() => {

            })
    }

    render() {
        return (
            <div>
                <div>
                    <Input
                        placeholder="First Name"
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                        onChange={this.changeFirstname}
                    />
                    <Input
                        placeholder="Last Name"
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                        onChange={this.changeLastname}
                    />
                </div>
                <div>
                    <Button variant="contained"  onClick={this.getUserReservations}>
                        View All Reservations
                    </Button>
                </div>
                <div>
                    {this.state.reservations.map((reservation, index) =>
                        <ReservationCard key={index}
                                  roomNumber={reservation.roomNumber}
                                  adults={reservation.adults}
                                  kids={reservation.kids}
                                  checkin={reservation.checkin}
                                  checkout={reservation.checkout}
                                  canceled={reservation.canceled}
                        />
                    )}
                </div>
            </div>
        );
    }
}