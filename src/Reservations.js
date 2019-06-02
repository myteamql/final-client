import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import RoomCard from './RoomCard';

export default class UserReservations extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            firstname: 'null',
            lastname: 'null',
            rooms: [],
            checkin: new Date(),
            checkout: new Date(),
            decor: 'null',
            occupants: -1,
            type: 'null'
        };

        this.changeFirstname = this.changeFirstname.bind(this);
        this.changeLastname = this.changeLastname.bind(this);
        this.getUserReservations = this.getRooms.bind(this);
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
                const rooms = response.data
                this.setState({
                    rooms
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
                        className={classes.input}
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                        onChange={this.changeFirstname}
                    />
                    <Input
                        placeholder="Last Name"
                        className={classes.input}
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                        onChange={this.changeLastname}
                    />
                </div>
                <div>
                    <Button variant="contained" className={classes.button} onClick={this.getUserReservations}>
                        View All Reservations
                    </Button>
                </div>
            </div>
        );
    }
}