import React from 'react';
import axios from 'axios';
import { Header } from './components/Header';
import { Drawer } from './components/Drawer';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { Orders } from './pages/Orders';
import { AppContext } from './Context';
import { Route, Routes } from 'react-router-dom';

export function App() {
    const [items, setItems] = React.useState([]); // отрисовка карточек на главной странице
    const [itemsCart, setItemsCart] = React.useState([]); // отрисовка карточек в корзине
    const [favorites, setFavorite] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [cartOpened, setCardOpened] = React.useState(false); // открытие/закрытие корзины
    const [isLoading, setIsLoading] = React.useState(true); // Preloader

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [itemsResponse, cartResponse, favoritesResponse] =
                    await Promise.all([
                        axios.get(
                            'https://67909a30af8442fd7376e8d8.mockapi.io/todoHexlet/items/'
                        ),
                        axios.get(
                            'https://67909a30af8442fd7376e8d8.mockapi.io/todoHexlet/cart/'
                        ),
                        axios.get(
                            'https://679b63a733d316846323ad48.mockapi.io/favorite/'
                        ),
                    ]);
                setIsLoading(false);
                setItems(itemsResponse.data);
                setItemsCart(cartResponse.data);
                setFavorite(favoritesResponse.data);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };
        fetchData();
    }, []);

    const onAddToCart = async (obj) => {
        try {
            const existingItem = itemsCart.find(
                (item) => Number(item.parentId) === Number(obj.id)
            );
            if (existingItem) {
                setItemsCart((prev) =>
                    prev.filter(
                        (item) => Number(item.parentId) !== Number(obj.id)
                    )
                );
                await axios.delete(
                    `https://67909a30af8442fd7376e8d8.mockapi.io/todoHexlet/cart/${existingItem.id}`
                );
            } else {
                setItemsCart((prev) => [...prev, obj]);
                const { data } = await axios.post(
                    'https://67909a30af8442fd7376e8d8.mockapi.io/todoHexlet/cart/',
                    obj
                );
                setItemsCart((prev) =>
                    prev.map((item) => {
                        if (item.parentId === data.parentId) {
                            return {
                                ...item,
                                id: data.id,
                            };
                        }
                        return item;
                    })
                );
            }
        } catch (error) {
            console.error('Ошибка при добавлении/удалении из корзины:', error);
        }
    };

    const onRemoveItem = async (id) => {
        try {
            await axios.delete(
                `https://67909a30af8442fd7376e8d8.mockapi.io/todoHexlet/cart/${id}`
            );
            setItemsCart((prev) =>
                prev.filter((item) => Number(item.id) !== Number(id))
            );
        } catch (error) {
            console.error('Ошибка при удалении из корзины:', error);
        }
    };

    const onChangeSearchInput = ({ target: { value } }) => {
        setSearchValue(value);
    };

    const isItemAdded = (id) => {
        return itemsCart.some((el) => Number(el.parentId) === Number(id));
    };

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.some((favObj) => favObj.title === obj.title)) {
                await axios.delete(
                    `https://679b63a733d316846323ad48.mockapi.io/favorite/${obj.id}`
                );
                setFavorite((prev) =>
                    prev.filter((el) => el.title !== obj.title)
                );
            } else {
                try {
                    const { data } = await axios.post(
                        'https://679b63a733d316846323ad48.mockapi.io/favorite/',
                        obj
                    );
                    setFavorite((prev) => [...prev, data]);
                } catch (error) {
                    console.error('Ошибка при удалении из корзины:', error);
                }
            }
        } catch (error) {
            console.error('Ошибка при удалении из избранного:', error);
        }
    };

    return (
        <AppContext.Provider
            value={{
                items,
                itemsCart,
                favorites,
                isItemAdded,
                setCardOpened,
                setItemsCart,
                onAddToFavorite,
            }}
        >
            <div className="wrapper clear">
                <Drawer
                    items={itemsCart}
                    onClose={() => setCardOpened(false)}
                    onRemove={(id) => onRemoveItem(id)}
                    opened={cartOpened}
                />
                <Header onClickCart={() => setCardOpened(true)} />

                <Routes>
                    <Route
                        path=""
                        exact
                        element={
                            <Home
                                items={items}
                                itemsCart={itemsCart}
                                searchValue={searchValue}
                                onChangeSearchInput={onChangeSearchInput}
                                onAddToCart={onAddToCart}
                                onAddToFavorite={onAddToFavorite}
                                setSearchValue={setSearchValue}
                                isLoading={isLoading}
                            />
                        }
                    ></Route>
                    <Route
                        path="favorites"
                        exact
                        element={
                            <Favorites onAddToFavorite={onAddToFavorite} />
                        }
                    ></Route>
                    <Route path="orders" exact element={<Orders />}></Route>
                </Routes>
            </div>
        </AppContext.Provider>
    );
}
