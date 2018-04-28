import React, { Component } from 'react';
import { div } from 'gl-matrix/src/gl-matrix/vec2';
import Toastr from 'toastr';
import { copy } from 'mi-elegant';
import { Button } from '@icedesign/base';
import fetch from '../../../../fetch';

import './Seats.scss';
import seats from './seats.json';

export default class Seats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seats: seats,
            selectedSeats: [],
            arrange: null
        };
    }

    getArrange = async () => {
        const arrange = await fetch({
            url: '/arrange/search',
            method: 'POST',
            data: {
                arrangeId: this.props.arrangeId 
            }
        })
        if (arrange.data.length) {
            console.log(arrange.data[0])
            this.setState({
                arrange: arrange.data[0]
            })
        } else {
            Toastr.info("暂无本场电影安排")
        }
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
        } else if (selectedSeats.length >= 6 && !seat.selected) {
            Toastr.info("您最多可购买六张电影票")
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

    componentWillMount () {
        this.getArrange()
    }

    render() {
        const { seats, selectedSeats, arrange } = this.state
        console.log(arrange)
        return (
            <div className="seats">
                <div className="seats-container">
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
                                return <div className="seats-row" key={itemIndex}>
                                    {item.map((seat, index) => {
                                        return <div key={index} onClick={() => {
                                            this.selectSeat(seat)
                                        }} className={this.judgeSeatStatus(seat)}>
                                        </div>
                                    })}
                                </div>
                            })
                        }
                        <div className="tips">
                            <div className="tip-item">
                                <div className="seat-item seat-item-unsale"></div>
                                <span>可选座位</span>
                            </div>
                            <div className="tip-item">
                                <div className="seat-item seat-item-saled"></div>
                                <span>已出售座位</span>
                            </div>
                            <div className="tip-item">
                                <div className="seat-item seat-item-selected"></div>
                                <span>已选座位</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="selected-seats-info">
                    <p>影片：{arrange ? arrange.movie.zh_name : '暂无名称'}</p>
                    <p>影院：一号影院</p>
                    <p>场次：{arrange ? arrange.time : '暂无场次'}</p>
                    <p className="selected-seats">
                        <span>座位：</span>
                        <div className="seats-list">
                            {
                                selectedSeats.length ?
                                    selectedSeats.map(seat => {
                                        return <span className="seat">{seat.seat_row}排{seat.seat_col}座</span>
                                    }) :
                                    <span>还未选座位</span>

                            }
                        </div>
                    </p>
                    <p>票数：{selectedSeats.length}</p>
                    <p>单价：¥{arrange ? arrange.price : 0}</p>
                    <p>总计：¥{ arrange ? selectedSeats.length * arrange.price : 0}</p>
                    <div className="btn-container">
                        <Button size="large" type="primary" onClick={this.buyTickets}>确认购买</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
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
        textAlign: 'center'
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center'
    },
}
