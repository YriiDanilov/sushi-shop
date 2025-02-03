import {Card} from '../components/Card'
import React from 'react'
import {AppContext} from '../Context'

export const Favorites = ({ onAddToFavorite }) => {

    const state = React.useContext(AppContext)

    return (
        <div className='content p-40 '>
            <div className='d-flex align-center mb-40 justify-between'>
                <h1>Мои закладки</h1>
            </div>
            <div className='d-flex flex-wrap'>
                {state.favorites.map((item) => (
                    <Card key={item.id} favorited={true} onFavorite={onAddToFavorite} {...item} />
                ))}
            </div>
        </div>
    )
}
