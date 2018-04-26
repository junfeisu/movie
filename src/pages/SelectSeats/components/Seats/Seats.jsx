import React, { Component } from 'react';
import { div } from 'gl-matrix/src/gl-matrix/vec2';
import Toastr from 'toastr';
import { copy } from 'mi-elegant';
import { Button } from '@icedesign/base'

import './Seats.scss';

export default class Seats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seats: [
                [{
                    saled: true,
                    selected: false,
                    seat_row: 1,
                    seat_col: 1
                }, {
                    saled: false,
                    selected: false,
                    seat_row: 1,
                    seat_col: 2
                }, {
                    saled: false,
                    selected: false,
                    seat_row: 1,
                    seat_col: 3
                }, {
                    saled: true,
                    selected: false,
                    seat_row: 1,
                    seat_col: 4
                }, {
                    saled: false,
                    selected: false,
                    seat_row: 1,
                    seat_col: 5
                }, {
                    saled: false,
                    selected: false,
                    seat_row: 1,
                    seat_col: 6
                }, {
                    saled: false,
                    selected: false,
                    seat_row: 1,
                    seat_col: 7
                }],
                [{
                    saled: false,
                    selected: false,
                    seat_row: 2,
                    seat_col: 1
                }, {
                    saled: false,
                    selected: false,
                    seat_row: 2,
                    seat_col: 2
                }, {
                    saled: false,
                    selected: false,
                    seat_row: 2,
                    seat_col: 3
                }, {
                    saled: false,
                    selected: false,
                    seat_row: 2,
                    seat_col: 4
                }, {
                    saled: false,
                    selected: false,
                    seat_row: 2,
                    seat_col: 5
                }],
                [{
                    saled: false,
                    selected: false,
                    seat_row: 3,
                    seat_col: 1
                }, {
                    saled: false,
                    selected: false,
                    seat_row: 3,
                    seat_col: 2
                }, {
                    saled: false,
                    selected: false,
                    seat_row: 3,
                    seat_col: 4
                }, {
                    saled: false,
                    selected: false,
                    seat_row: 3,
                    seat_col: 5
                }],
            ],
            selectedSeats: []
        };
    }

    buyTickets = async () => {
        console.log('购票')
    }

    judgeSeatStatus = (seat) => {
        if (seat.saled) {
            return 'seat-item seat-item-saled'
        } else {
            return seat.selected ? 'seat-item seat-item-selected' : 'seat-item seat-item-unsale'
        }
    }

    selectSeat = (seat) => {
        const { selectedSeats } = this.state
        if (seat.saled) {
            Toastr.info("该座位已经出售，请选择其他座位")
            return
        }

        seat.selected = !seat.selected
        if (seat.selected) {
            let tempSeats = copy(selectedSeats)
            tempSeats.push(seat)
            this.setState({
                selectedSeats: tempSeats
            })
        } else {
            let copyedSeats = copy(selectedSeats)
            let seatIndex = copyedSeats.indexOf(seat)
            copyedSeats.splice(seatIndex, 1)
            if (seatIndex >= 0) {
                this.setState({
                    selectedSeats: copyedSeats
                })
            }
        }
    }

    render() {
        const { seats, selectedSeats } = this.state
        return (
            <div style={styles.seatsContainer}>
                <div style={styles.rowNumContainer}>
                    {
                        seats.map((item, index) => {
                            return <span style={styles.rowNumItem}>{index + 1}</span>
                        })
                    }
                </div>
                <div style={styles.rowContainer}>
                    {
                        seats.map((item, itemIndex) => {
                            return <div style={styles.seatsRow} key={itemIndex}>
                                {item.map((seat, index) => {
                                    return <div key={index} onClick={() => {
                                        this.selectSeat(seat)
                                    }} className={this.judgeSeatStatus(seat)}>
                                        {index + 1}
                                    </div>
                                })}
                            </div>
                        })
                    }
                </div>
                <div className="selected-seats-info">
                    <p>影片：头号玩家</p>
                    <p>时间：2011-11-11 21:00</p>
                    <p className="seats">座位：
                        {
                            selectedSeats.map(seat => {
                                return <span className="seat">{seat.seat_row}排{seat.seat_col}座</span>
                            })
                        }
                    </p>
                    <p>票数：{selectedSeats.length}</p>
                    <p>总计：¥240</p>
                    <Button type="primary" onClick={this.buyTickets}>确认购买</Button>
                </div>
            </div>
        )
    }
}

const styles = {
    seatsContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    rowNumContainer: {
        width: '20px',
        display: 'flex',
        flexDirection: 'column',
        marginRight: '20px'
    },
    rowNumItem: {
        fontSize: '20px',
        color: '#ffffff',
        marginBottom: '10px',
        height: '30px',
        lineHeight: '30px'
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    seatsRow: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '10px'
    },
}
