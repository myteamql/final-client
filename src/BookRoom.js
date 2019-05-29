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
    }
    componentWillMount() {
        this.getRooms();
    }

    getRooms() {
        let inmonth = this.state.checkin.getMonth()+1;
        let outmonth = this.state.checkout.getMonth()+1;
        let checkin = this.state.checkin.getFullYear() + "-" + inmonth + "-" +this.state.checkin.getDate();
        let checkout = this.state.checkout.getFullYear() + "-" + outmonth + "-" +this.state.checkout.getDate();
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
            });
    }

    handleChange = sliderValues => {
        this.setState({ sliderValues });
        this.getRooms();
    };
    changeCheckin(event) {
        this.setState({
            checkin: event.target.value
        })
        this.getRooms();
    }
    changeCheckout(event) {
        this.setState({
            checkout: event.target.value
        })
        this.getRooms();
    }
    changeDecor(event) {
        this.setState({
            decor: event.target.value
        })
        this.getRooms();
    }
    changeOccupants(event) {
        this.setState({
            occupants: event.target.value
        })
        this.getRooms();
    }
    changeType(event) {
        this.setState({
            type: event.target.value
        })
        this.getRooms();
    }

    render ()
    {
        const { sliderValues } = this.state;
        console.log(this.state.rooms)
        return (
            <div>
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
                {this.state.rooms.map((room, index) =>
                    <li key={index}>
                        <p>{room.roomNumber}</p>
                        <p>{room.maxOccupant}</p>
                        <p>{room.type}</p>
                        <p>{room.decor}</p>
                        <p>{room.price}</p>
                        <p>{room.beds}</p>
                        <p>{room.length}</p>
                        <p>{room.popularity}</p>
                        <p>{room.pictureurl}</p>
                    </li>
                )}
            </div>
        );
    }
}
