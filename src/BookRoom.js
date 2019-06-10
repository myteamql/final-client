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

export default class BookRoom extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            rooms: [],
            checkin: new Date(),
            checkout: new Date(),
            decor: 'null',
            occupants: -1,
            type: 'null',
            sliderValues: [0, 500]
        };

        this.changeCheckin = this.changeCheckin.bind(this);
        this.changeCheckout = this.changeCheckout.bind(this);
        this.changeDecor = this.changeDecor.bind(this);
        this.changeOccupants = this.changeOccupants.bind(this);
        this.changeType = this.changeType.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getRooms = this.getRooms.bind(this);
        this.getAllRooms = this.getAllRooms.bind(this);
    }
    componentWillMount() {
        this.getRooms();
    }

    getAllRooms() {
        let url = "http://localhost:8080/rooms";
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

    getRooms() {
        let inmonth = new Date(this.state.checkin).getMonth()+1;
        let outmonth = new Date(this.state.checkout).getMonth()+1;
        let checkin = new Date(this.state.checkin).getFullYear() + "-" + inmonth + "-" + new Date(this.state.checkin).getDate();
        let checkout = new Date(this.state.checkout).getFullYear() + "-" + outmonth + "-" + new Date(this.state.checkout).getDate();
        let occupants = this.state.occupants;
        let type = this.state.type;
        let decor = this.state.decor;
        let floor = this.state.sliderValues[0];
        let ceiling = this.state.sliderValues[1];

        let url = "http://localhost:8080/rooms/"+checkin+"/"+checkout+"/"+occupants+"/"+type+"/"+decor+"/"+floor+"/"+ceiling;
        console.log(url);
        axios
            .get(url)
            .then((response) => {
                const rooms = response.data
                this.setState({
                    rooms
                });
                this.$emit("success");
            })
            .catch(() => {
            })

    }

    handleChange = sliderValues => {
        this.setState({ sliderValues }, () =>{
            this.getRooms();
        })
    };
    changeCheckin(event) {
        this.setState({
            checkin: event.target.value
        }, () =>{
            this.getRooms();
        })
    }
    changeCheckout(event) {
        this.setState({
            checkout: event.target.value
        }, () =>{
            this.getRooms();
        })
    }
    changeDecor(event) {
        this.setState({
            decor: event.target.value
        }, () =>{
            this.getRooms();
        })
    }
    changeOccupants(event) {
        this.setState({
            occupants: event.target.value
        }, () =>{
            this.getRooms();
        })
    }
    changeType(event) {
        this.setState({
            type: event.target.value
        }, () =>{
            this.getRooms();
        })
    }


    render ()
    {
        const { sliderValues } = this.state;

        console.log(this.state.rooms)
        return (
            <div>
                <Grid container spacing={8} justify="center" direction={"row"}>
                    <Grid item>
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
                    </Grid>
                    <Grid item>
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
                    </Grid>
                    <Grid item>
                <form autoComplete="off">
                    <FormControl>
                        <InputLabel htmlFor="type-helper">Type</InputLabel>
                        <Select
                            value={this.state.type}
                            onChange={this.changeType}
                            input={<Input name="type" id="type-helper"/>}
                        >
                            <MenuItem value="null">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"twin"}>Twin</MenuItem>
                            <MenuItem value={"full"}>Full</MenuItem>
                            <MenuItem value={"queen"}>Queen</MenuItem>
                            <MenuItem value={"king"}>King</MenuItem>
                        </Select>
                        <FormHelperText>Bed type</FormHelperText>
                    </FormControl>
                </form>
                    </Grid>
                    <Grid item>
                <form autoComplete="off">
                    <FormControl>
                        <InputLabel htmlFor="decor-helper">Decor</InputLabel>
                        <Select
                            value={this.state.decor}
                            onChange={this.changeDecor}
                            input={<Input name="decor" id="decor-helper"/>}
                        >
                            <MenuItem value="null">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Modern"}>Modern</MenuItem>
                            <MenuItem value={"Rustic"}>Rustic</MenuItem>
                            <MenuItem value={"Traditional"}>Traditional</MenuItem>
                            <MenuItem value={"Shabby Chic"}>Shabby Chic</MenuItem>
                            <MenuItem value={"Bohemian"}>Bohemian</MenuItem>
                            <MenuItem value={"Minimalist"}>Minimalist</MenuItem>
                        </Select>
                        <FormHelperText>Room decor</FormHelperText>
                    </FormControl>
                </form>
                    </Grid>
                    <Grid item>
                    <form autoComplete="off">
                        <FormControl>
                            <InputLabel htmlFor="occupants-helper">Occupants</InputLabel>
                            <Select
                                value={this.state.occupants}
                                onChange={this.changeOccupants}
                                input={<Input name="occupants" id="occupants-helper"/>}
                            >
                                <MenuItem value={-1}>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                            </Select>
                            <FormHelperText>Number of occupants</FormHelperText>
                        </FormControl>

                </form>
                    </Grid>

                </Grid>

                    <div style={{ margin: 100 }}>
                        ${sliderValues[0]} - ${sliderValues[1]}
                        <Range
                            min={0}
                            max={500}
                            onChange={this.handleChange}
                            defaultValue={sliderValues}
                            tipFormatter={value => <span className="tooltip">{value}€</span>}
                        />

                    </div>
                <Button variant="contained" onClick={this.getAllRooms} >
                    All Rooms
                </Button>

                {this.state.rooms.map((room, index) =>
                    <RoomCard key={index}
                        roomNumber={room.roomNumber}
                        maxOccupants={room.maxOccupants}
                        type={room.type}
                        decor={room.decor}
                        price={room.price}
                        beds={room.beds}
                        length={room.length}
                        popularity={room.popularity}
                        nextAvailable={room.nextAvailable}
                        pic={room.pictureurl}
                    />
                )}

            </div>
        );
    }
}
