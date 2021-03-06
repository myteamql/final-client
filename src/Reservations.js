import React from 'react';
import Input from '@material-ui/core/Input';
import 'rc-slider/assets/index.css';
import axios from "axios";
import Button from '@material-ui/core/Button';
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
        });
    }

    changeLastname(event) {
        this.setState({
            lastname: event.target.value
        });
    }

    getUserReservations() {
        let url = "https://myteamql-back.herokuapp.com/reservations/" + this.state.firstname + "/" + this.state.lastname;
        console.log(url);
        axios
            .get(url)
            .then((response) => {
                const reservations = response.data
                this.setState({
                    reservations: reservations
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
                        style={{marginRight: '15px'}}
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
                    <Button variant="contained" onClick={this.getUserReservations} style={{marginTop: '15px'}}>
                        View All Reservations
                    </Button>
                </div>
                <div>
                    {this.state.reservations.map((reservation, index) =>
                        <ReservationCard key={index}
                                         firstname={reservation.firstName}
                                         lastname={reservation.lastName}
                                         code={reservation.code}
                                         roomNumber={reservation.room}
                                         adults={reservation.adults}
                                         kids={reservation.kids}
                                         checkin={reservation.checkIn}
                                         checkout={reservation.checkOut}
                                         canceled={reservation.canceled}
                                         picture={reservation.picture}
                        />
                    )}
                </div>
            </div>
        );
    }
}