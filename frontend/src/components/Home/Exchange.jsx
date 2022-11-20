import React, { useEffect, useState } from 'react'
import exchange from '../../assets/exchange.png'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
export default function Exchange() {
    const moneyList = ['USD',
        'RUB',
        'EUR',
        'BTC',
    ]
    const moneyList1 = [
        'RUB',
        'EUR',
        'BTC',
        'USD'
    ]
    const [valueLeft, setValueLeft] = useState(moneyList[0])
    const [valueRight, setValueRight] = useState(moneyList[1])
    const [valueRFinal, setvalueRFinal] = useState(0)
    const [valueTranslate, setvalueRTranslate] = useState(0)
    const token = useSelector((state) => state.main.token)
    const getCurrency = async (type1, type2) => {
        const res = await axios.post('http://79.120.76.23:8888/get', { type1, type2 }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        console.log({ type1, type2 })
        console.log(res.data)
        setvalueRTranslate(res.data)
        return res.data
    }
    const buyCurrency = async (event) => {
        event.preventDefault()
        console.log('input',event.target[0].value)
        await axios.post('http://79.120.76.23:8888/exchange', {type1: valueLeft, type2:valueRight , value: event.target[0].value }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

    useEffect(() => {
        getCurrency(valueLeft, valueRight)
    }, [valueLeft, valueRight])
    return (
        <div style={{
            'width': '80%',
            'marginLeft': '100px'
        }}>
            <h1>Биржа</h1>
            <div className="trade-management__column-inner-top">
                <div className="trade-management__head">
                    <div className="trade-management__title">График</div>                                                <div className="trade-management__times">
                        <button type="button" className="trade-management__time-btn" data-type="15m">12Ч</button>
                        <button type="button" className="trade-management__time-btn" data-type="30m">1Д</button>
                        <button type="button" className="trade-management__time-btn is-active-time-btn" data-type="1h">3Д</button>
                        <button type="button" className="trade-management__time-btn" data-type="4h">1Н</button>
                        <button type="button" className="trade-management__time-btn" data-type="1d">1М</button>
                        <button type="button" className="trade-management__time-btn" data-type="7d">ВСЕ</button>
                    </div>

                    <div className="trade-management__theme">
                        <button type="button" className="trade-management__theme-btn btn-active">Old</button>
                        <button type="button" className="trade-management__theme-btn" >New</button>
                    </div>
                </div>
                <div className="trade-management__info-over-time">
                    <div className="trade-management__info-over-time-prace last-price-top">
                        <div><i className="fa fa-usd"></i>16,725<span className="insgnzrs">.00</span></div>
                        <strong>Последняя Цена</strong>
                    </div>
                    <div className="trade-management__info-over-time-prace last-price-delta-top trade-delta-down">
                        <div>-<i className="fa fa-usd"></i>81<span>.00</span> (0.48%)</div>
                        <strong>Изменение за 24ч</strong>
                    </div>
                    <div className="trade-management__info-over-time-prace max-price-top">
                        <div><i className="fa fa-usd"></i>16,900<span>.00</span></div>
                        <strong>Макс за 24ч</strong>
                    </div>
                    <div className="trade-management__info-over-time-prace min-price-top">
                        <div><i className="fa fa-usd"></i>16,700<span>.00</span></div>
                        <strong>Мин за 24ч</strong>
                    </div>
                </div>
                <div className="trade-management__graph">
                    <img style={{
                        'width': '600px',
                        'height': '400px',
                    }} src={exchange} />
                </div>

                {/* trade  label*/}

                <div className="trade-management__choice-crypt-curr" style={{
                    'width': '100px',
                    'margin': '0 auto'
                }}>
                    <div className="trade-management__select trade-management__select--left SumoSelect">
                        <div className="SumoSelect sumo_curr_out" tabindex="0" role="button" aria-expanded="false"><select value={valueLeft} onChange={e => { setValueLeft(e.target.value) }} className="SlectBox SlectBox--direction SumoUnder" name="curr_out" tabindex="-1">
                            {moneyList.map(item => <option value={item} data-icon="icon-trx">{item}</option>)}
                        </select>
                        </div>
                    </div>
                    <span className="trade-management__sep">/</span>
                    <div className="trade-management__select trade-management__select--right SumoSelect js-select-custom">
                        <div className="SumoSelect sumo_curr_in" tabindex="0" role="button" aria-expanded="false"><select value={valueRight} onChange={e => { setValueRight(e.target.value) }} className="SlectBox SlectBox--direction SumoUnder" name="curr_in" tabindex="-1">
                            {moneyList1.map(item => <option value={item} data-icon="icon-trx">{item}</option>)}
                        </select>
                        </div>
                    </div>
                </div>
                {/* trade */}
                <div className="trade-management__limit-form">
                    <div className="limit_form_cell">
                        <div className="trade-management__limit-inputs">
                            <div className="trade-management__limit-title">Продать</div>
                            <form onSubmit={e => buyCurrency(e)} method="post" className="form_order_buy form-buy">
                                <div className="trade-management__limit-body">
                                    <div className="trade-management__limit-name">
                                        <span>Получаю</span>
                                    </div>
                                    <div className="trade-management__limit-input">
                                        <input onChange={e => setvalueRFinal(e.target.value*valueTranslate)} type='number' min={0} defaultValue={0} step='any' name="amount" />
                                        <span>{valueLeft}</span>
                                    </div>
                                </div>
                                <div className="trade-management__limit-body">
                                    <div className="trade-management__limit-name">
                                        <span>Цена за {valueLeft}</span>
                                    </div>
                                    <div className="trade-management__limit-input">
                                        <input type="text" name="price" value={valueTranslate} autocomplete="off" maxlength="20" />
                                        <span>{valueLeft}</span>
                                    </div>
                                    <div className="trade-management__limit-input">
                                        <input name="price" autocomplete="off" maxlength="20" value={valueRFinal} />
                                        <span>{valueRight}</span>
                                    </div>
                                </div>

                                <div className="trade-management__limit-bottom">
                                    <div className="trade-management__limit-commission">

                                    </div>
                                    <button type="submit" className="trade-management__btn-buy">КУПИТЬ</button>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}