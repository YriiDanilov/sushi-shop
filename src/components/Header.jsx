import { Link } from 'react-router-dom'
import React from 'react'
import { useCart } from './hooks/useCart'

export function Header(props) {
    const { totalPrice } = useCart()

    return (
        <header className='d-flex justify-between align-center p-40'>
            <Link to={process.env.PUBLIC_URL + '/'}>
                <div className='d-flex align-center'>
                    <img width={40} height={40} src='img/sushi-logo.jpg' alt='logo' />
                    <div>
                        <h3 className='text-uppercase'>Sushi shop</h3>
                        <p className='opacity-5'>Лучшие ролы! Попробуй сам.</p>
                    </div>
                </div>
            </Link>
            <ul className='d-flex '>
                <li className='mr-30 cu-p' onClick={props.onClickCart}>
                    <img width={18} height={18} src='img/cart.svg' alt='cart' />
                    <span>{totalPrice} руб.</span>
                </li>
                <li className='mr-30 cu-p'>
                    <Link to={process.env.PUBLIC_URL + '/favorites'}>
                        <img width={18} height={18} src='img/favorite.svg' alt='favorite' />
                        <span>Любимое</span>
                    </Link>
                </li>
                <li className='mr-30 cu-p'>
                    <Link to={process.env.PUBLIC_URL + '/orders'}>
                        <img width={18} height={18} src='img/user.svg' alt='user' />
                        <span>Уже ел</span>
                    </Link>
                </li>
            </ul>
        </header>
    )
}
