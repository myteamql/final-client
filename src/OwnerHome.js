import React from "react";
import SimpleTable from "./SimpleTable";

export default class OwnerHome extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            error: null,
            hasMounted: false,
            entries: [], // list of json{roomNumber, year, month, revenue}
            yearToRoomToMonthToRevenue: {},
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        };

        this.initState = this.initState.bind(this);
        this.getRoomToYearToMonthToRevenue = this.getRoomToYearToMonthToRevenue.bind(this);
    }

    componentDidMount() {
        this.setState({
            hasMounted: true
        });
        this.initState();
    }

    initState() {
        let url = "https://myteamql-back.herokuapp.com/revenue";
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        hasMounted: true,
                        entries: result
                    });
                    this.getRoomToYearToMonthToRevenue();
                },
                (error) => {
                    this.setState({
                        hasMounted: true,
                        error
                    });
                }
            );

    }

    getRoomToYearToMonthToRevenue() {
        let {entries} = this.state;
        let yearToRoomToMonthToRevenue = {};
        console.log(entries.length);
        for (let entry of entries) {
            if (!(entry.year in yearToRoomToMonthToRevenue)) {
                yearToRoomToMonthToRevenue[entry.year] = {}
            }

            let roomToMonthToRevenue = yearToRoomToMonthToRevenue[entry.year];
            if (!(entry.roomNumber in roomToMonthToRevenue)) {
                roomToMonthToRevenue[entry.roomNumber] = {}
            }

            let monthToRevenue = roomToMonthToRevenue[entry.roomNumber];
            if (!(entry.month in monthToRevenue)) {
                monthToRevenue[entry.month] = entry.revenue;
            }
        }
        this.setState({
            yearToRoomToMonthToRevenue: yearToRoomToMonthToRevenue
        });
    }

    render () {
        const {error, hasMounted, yearToRoomToMonthToRevenue, months} = this.state;
        const newline = <div> &nbsp; </div>;
        const newlineGroup = [newline, newline, newline, newline, newline];

        const items = Object.keys(yearToRoomToMonthToRevenue).map(function(year) {
            var grandTotal = 0;
            var monthTotals = {};
            months.map(month => (
                monthTotals[month] = 0
            ));
            const yr = <h1 align="center" key={year}>{year}</h1>;
            const roomsStats = Object.keys(yearToRoomToMonthToRevenue[year]).map(function(room) {
                const header = <h2 align="left">Room #{room}</h2>;
                var total = 0;
                Object.keys(yearToRoomToMonthToRevenue[year][room]).map(function(month) {
                    total += yearToRoomToMonthToRevenue[year][room][month];
                    monthTotals[month] += yearToRoomToMonthToRevenue[year][room][month];
                });
                grandTotal += total;
                return [header, <SimpleTable monthlyRevenue={yearToRoomToMonthToRevenue[year][room]} total={total}/>];
            }
            );
            const totalsHeader = <h2 align="left">Totals</h2>;
            const totalsTable = <SimpleTable monthlyRevenue={monthTotals} total={grandTotal}/>;
            const totals = [totalsHeader, totalsTable]
            return [yr, roomsStats, totals, newlineGroup];
        });

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!hasMounted) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    <ul> {items} </ul>
                </div>
            )
        }
    }
}
