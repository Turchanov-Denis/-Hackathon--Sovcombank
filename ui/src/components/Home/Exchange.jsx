import React from 'react'
import exchange from '../../assets/exchange.png'
export default function Exchange() {
    const moneyList = ['USD',
        'RUB',
        'EUR',
        'BTC',
    ]
    return (
        <div style={{
            'width': '80%',
            'marginLeft': '100px'
        }}>
            <h1>Биржа</h1>
            <div class="trade-management__column-inner-top">
                <div class="trade-management__head">
                    <div class="trade-management__title">График</div>                                                <div class="trade-management__times">
                        <button type="button" class="trade-management__time-btn" data-type="15m">12Ч</button>
                        <button type="button" class="trade-management__time-btn" data-type="30m">1Д</button>
                        <button type="button" class="trade-management__time-btn is-active-time-btn" data-type="1h">3Д</button>
                        <button type="button" class="trade-management__time-btn" data-type="4h">1Н</button>
                        <button type="button" class="trade-management__time-btn" data-type="1d">1М</button>
                        <button type="button" class="trade-management__time-btn" data-type="7d">ВСЕ</button>
                    </div>

                    <div class="trade-management__theme">
                        <button type="button" class="trade-management__theme-btn btn-active">Old</button>
                        <button type="button" class="trade-management__theme-btn" onclick="document.location='/ru/account/trade/'">New</button>
                    </div>
                </div>
                <div class="trade-management__info-over-time">
                    <div class="trade-management__info-over-time-prace last-price-top">
                        <div><i class="fa fa-usd"></i>16,725<span class="insgnzrs">.00</span></div>
                        <strong>Последняя Цена</strong>
                    </div>
                    <div class="trade-management__info-over-time-prace last-price-delta-top trade-delta-down">
                        <div>-<i class="fa fa-usd"></i>81<span>.00</span> (0.48%)</div>
                        <strong>Изменение за 24ч</strong>
                    </div>
                    <div class="trade-management__info-over-time-prace max-price-top">
                        <div><i class="fa fa-usd"></i>16,900<span>.00</span></div>
                        <strong>Макс за 24ч</strong>
                    </div>
                    <div class="trade-management__info-over-time-prace min-price-top">
                        <div><i class="fa fa-usd"></i>16,700<span>.00</span></div>
                        <strong>Мин за 24ч</strong>
                    </div>
                </div>
                <div class="trade-management__graph">
                    <img style={{
                        'width': '600px',
                        'height': '400px',
                    }} src={exchange} />
                </div>

                {/* trade  label*/}

                <div class="trade-management__choice-crypt-curr" style={{
                    'width': '100px',
                    'margin': '0 auto'
                }}>
                    <div class="trade-management__select trade-management__select--left SumoSelect">
                        <div class="SumoSelect sumo_curr_out" tabindex="0" role="button" aria-expanded="false"><select class="SlectBox SlectBox--direction SumoUnder" name="curr_out" tabindex="-1">
                            {moneyList.map(item => <option value={item}  data-icon="icon-trx">{item}</option>)}
                        </select>
                            {/* <p class="CaptionCont SelectBox" title=" BTC" style="border-color: rgb(244, 139, 64);"><span class="SumoSelect-icon" style="background-color: rgb(244, 139, 64);"><i class="icon-btc"></i></span><span> BTC</span><label style="color: rgb(244, 139, 64);"><i></i></label></p><div class="optWrapper" style="border-color: rgba(244, 139, 64, 0.14);"><ul class="options"><li class="opt selected"><label><span style="background-color: rgb(244, 139, 64);"><i class="icon-btc"></i></span>BTC</label></li><li class="opt"><label><span style="background-color: rgb(87, 179, 147);"><i class="icon-ust"></i></span>USDT</label></li><li class="opt disabled"><label><span style="background-color: rgb(51, 204, 0);"><i class="icon-usd"></i></span>USD</label></li><li class="opt"><label><span style="background-color: rgb(232, 150, 123);"><i class="icon-rub"></i></span>RUB</label></li><li class="opt"><label><span style="background-color: rgb(83, 187, 243);"><i class="icon-eur"></i></span>EUR</label></li><li class="opt"><label><span style="background-color: rgb(42, 115, 164);"><i class="icon-xrp"></i></span>XRP</label></li><li class="opt"><label><span style="background-color: rgb(98, 135, 165);"><i class="icon-eth"></i></span>ETH</label></li><li class="opt"><label><span style="background-color: rgb(134, 134, 134);"><i class="icon-ltc"></i></span>LTC</label></li><li class="opt"><label><span style="background-color: rgb(51, 152, 217);"><i class="icon-daa"></i></span>DASH</label></li><li class="opt"><label><span style="background-color: rgb(75, 207, 81);"><i class="icon-bch"></i></span>BCH</label></li><li class="opt"><label><span style="background-color: rgb(248, 191, 26);"><i class="icon-dog"></i></span>DOGE</label></li><li class="opt"><label><span style="background-color: rgb(211, 100, 100);"><i class="icon-trx"></i></span>TRX</label></li></ul></div> */}
                        </div>
                    </div>
                    <span class="trade-management__sep">/</span>
                    <div class="trade-management__select trade-management__select--right SumoSelect js-select-custom">
                        <div class="SumoSelect sumo_curr_in" tabindex="0" role="button" aria-expanded="false"><select class="SlectBox SlectBox--direction SumoUnder" name="curr_in" tabindex="-1">
                            {moneyList.slice(1).map(item => <option value={item}  data-icon="icon-trx">{item}</option>)}
                        </select>
                            {/* <p class="CaptionCont SelectBox" title=" USD" style="border-color: rgb(51, 204, 0);"><span class="SumoSelect-icon" style="background-color: rgb(51, 204, 0);"><i class="icon-usd"></i></span><span> USD</span><label style="color: rgb(51, 204, 0);"><i></i></label></p><div class="optWrapper" style="border-color: rgba(51, 204, 0, 0.14);"><ul class="options"><li class="opt disabled"><label><span style="background-color: rgb(244, 139, 64);"><i class="icon-btc"></i></span>BTC</label></li><li class="opt"><label><span style="background-color: rgb(87, 179, 147);"><i class="icon-ust"></i></span>USDT</label></li><li class="opt selected"><label><span style="background-color: rgb(51, 204, 0);"><i class="icon-usd"></i></span>USD</label></li><li class="opt"><label><span style="background-color: rgb(232, 150, 123);"><i class="icon-rub"></i></span>RUB</label></li><li class="opt"><label><span style="background-color: rgb(83, 187, 243);"><i class="icon-eur"></i></span>EUR</label></li><li class="opt"><label><span style="background-color: rgb(42, 115, 164);"><i class="icon-xrp"></i></span>XRP</label></li><li class="opt"><label><span style="background-color: rgb(98, 135, 165);"><i class="icon-eth"></i></span>ETH</label></li><li class="opt"><label><span style="background-color: rgb(134, 134, 134);"><i class="icon-ltc"></i></span>LTC</label></li><li class="opt"><label><span style="background-color: rgb(51, 152, 217);"><i class="icon-daa"></i></span>DASH</label></li><li class="opt"><label><span style="background-color: rgb(75, 207, 81);"><i class="icon-bch"></i></span>BCH</label></li><li class="opt"><label><span style="background-color: rgb(248, 191, 26);"><i class="icon-dog"></i></span>DOGE</label></li><li class="opt"><label><span style="background-color: rgb(211, 100, 100);"><i class="icon-trx"></i></span>TRX</label></li></ul></div> */}
                        </div>
                    </div>
                </div>
                {/* trade */}
                <div class="trade-management__limit-form">
                    <div class="limit_form_cell">
                        <div class="trade-management__limit-inputs">
                            <div class="trade-management__limit-title">Купить Bitcoin</div>
                            <form method="post" class="form_order_buy form-buy" action="/bitrix/components/trade/buy/templates/2020/ajax.php" onsubmit="beforeLimitBuySubmit(); return false;">
                                <div class="trade-management__limit-body">
                                    <div class="trade-management__limit-name">
                                        <span>Получаю</span>
                                    </div>
                                    <div class="trade-management__limit-input">
                                        <input type="text" name="amount" value="" autocomplete="off" maxlength="20" />
                                        <span>BTC</span>
                                    </div>
                                </div>
                                <div class="trade-management__limit-body">
                                    <div class="trade-management__limit-name">
                                        <span>Цена за BTC</span>
                                    </div>
                                    <div class="trade-management__limit-input">
                                        <input type="text" name="price" value="16783" autocomplete="off" maxlength="20" />
                                        <span>USD</span>
                                    </div>
                                </div>
                               
                                <div class="trade-management__limit-bottom">
                                    <div class="trade-management__limit-commission">
                                        <strong>Комиссия 0.095%</strong>
                                        <div><div class="calc-price--fee">0<span>.00000000</span></div> BTC</div>
                                    </div>
                                    <button type="submit" class="trade-management__btn-buy">КУПИТЬ</button>
                                </div>
                                <input type="hidden" name="curr_out" value="BTC" />
                                <input type="hidden" name="curr_in" value="USD" />
                                <input type="hidden" name="action" value="buy" />
                                <input type="hidden" name="block" value="0" />
                                <input type="hidden" name="sessid" id="sessid" value="288bf909e3a989faf1e8f09a539c38a0" /></form>

                        </div>
                    </div>
                    <div class="limit_form_cell">
                        <div class="trade-management__limit-inputs">
                            <div class="trade-management__limit-title">Продать Bitcoin</div>
                            <form method="post" class="form_order_sell form-sell" action="/bitrix/components/trade/sell/templates/2020/ajax.php" onsubmit="beforeLimitSellSubmit();  return false;">
                                <div class="trade-management__limit-body">
                                    <div class="trade-management__limit-name">
                                        <span>Отдаю</span>
                                    </div>
                                    <div class="trade-management__limit-input">
                                        <input type="text" name="amount" value="" autocomplete="off" maxlength="20" />
                                        <span>BTC</span>
                                    </div>
                                </div>
                                <div class="trade-management__limit-body">
                                    <div class="trade-management__limit-name">
                                        <span>Цена за BTC</span>
                                    </div>
                                    <div class="trade-management__limit-input">
                                        <input type="text" name="price" value="16725" autocomplete="off" maxlength="20" />
                                        <span>USD</span>
                                    </div>
                                </div>
                              
                                <div class="trade-management__limit-bottom">
                                    <div class="trade-management__limit-commission">
                                        <strong>Комиссия 0.095%</strong>
                                        <div><div class="calc-price--fee">0<span>.00</span></div> USD</div>
                                    </div>
                                    <button type="submit" class="trade-management__btn-buy trade-management__btn-buy--sell">ПРОДАТЬ</button>
                                </div>
                                <input type="hidden" name="curr_out" value="BTC" />
                                <input type="hidden" name="curr_in" value="USD" />
                                <input type="hidden" name="action" value="sell" />
                                <input type="hidden" name="block" value="0" />
                                <input type="hidden" name="sessid" id="sessid_1" value="288bf909e3a989faf1e8f09a539c38a0" /></form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}