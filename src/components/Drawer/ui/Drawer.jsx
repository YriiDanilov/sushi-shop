import React from 'react'
import axios from 'axios'

import { useCart } from '../../hooks/useCart'
import { Info } from '../../Info'

import styles from './Drawer.module.scss'

export const Drawer = ({ onClose, items = [], onRemove, opened }) => {
    const { itemsCart, setItemsCart, totalPrice } = useCart()
    const [orderId, setOrderId] = React.useState(null)
    const [isOrderCompleted, setIsOrderCompleted] = React.useState(false)
    const [isLoadingOrder, setIsLoadingOrder] = React.useState(false)

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    const onClickOrder = async () => {
        try {
            setIsLoadingOrder(true)
            const { data } = await axios.post('https://679b63a733d316846323ad48.mockapi.io/orders/', {
                items: itemsCart,
            })
            setOrderId(data.id)
            setIsOrderCompleted(true)
            setItemsCart([])
            for (let item of itemsCart) {
                await axios.delete(`https://67909a30af8442fd7376e8d8.mockapi.io/todoHexlet/cart/${item.id}`)
                await delay(1000)
            }
        } catch (error) {
            console.log('Ошибка отправки данных заказа')
        }
        setIsLoadingOrder(false)
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={`${styles.drawer}`}>
                <h2 className='d-flex justify-between mb-30'>
                    Корзина <img className='removeBtn cu-p' src='img/btn-remove.svg' alt='close' onClick={onClose} />
                </h2>

                {items.length > 0 ? (
                    <>
                        <div className='items flex'>
                            {items.map((obj) => (
                                <div className='cartItem d-flex align-center mb-20' key={obj.id}>
                                    <div style={{ backgroundImage: `url(${obj.img})` }} className='cardItemImg'></div>
                                    <div className='mr-20 flex'>
                                        <p className='mb-5'>{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img className='removeBtn' src='img/btn-remove.svg' alt='remove' onClick={() => onRemove(obj.id)} />
                                </div>
                            ))}
                        </div>
                        <div className='cartTotalBlock'>
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} руб</b>
                                </li>
                                <li>
                                    <span>НДС 1%</span>
                                    <div></div>
                                    <b>{((totalPrice / 100) * 1).toFixed(2)} руб</b>
                                </li>
                            </ul>
                            <button disabled={isLoadingOrder} onClick={onClickOrder} className='greenButton'>
                                Оформить заказ
                                <img src='img/arrow.svg' alt='arrow' />
                            </button>
                        </div>
                    </>
                ) : (
                    <Info
                        title={isOrderCompleted ? `Заказ оформлен №${orderId}` : 'Корзина пустая'}
                        description={isOrderCompleted ? 'Ваш заказ передан на доставку. Пожалуйста ожидайте курьера!' : 'Мы очень надеемся что вы что-то закажите :)'}
                        image={isOrderCompleted ? 'img/order.png' : 'img/emptyCart.jpg'}
                    />
                )}
            </div>
        </div>
    )
}
