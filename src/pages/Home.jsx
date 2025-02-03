import { Card } from '../components/Card/ui/Card';

export const Home = ({
    items,
    searchValue,
    onChangeSearchInput,
    onAddToCart,
    onAddToFavorite,
    setSearchValue,
    itemsCart,
    isLoading,
}) => {
    const renderItems = () => {
        const filteredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );

        return (isLoading ? [...Array(8)] : filteredItems).map((item, i) => (
            <Card
                key={i}
                {...item}
                onPlus={(obj) => onAddToCart(obj)}
                onFavorite={(obj) => onAddToFavorite(obj)}
                itemsCart={itemsCart}
                loading={isLoading}
            />
        ));
    };

    return (
        <div className="content p-40 ">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Наши роллы</h1>
                <div className="search-block d-flex">
                    <img src="img/search.svg" alt="search" />
                    {searchValue && (
                        <img
                            className="clear cu-p"
                            src="img/btn-remove.svg"
                            alt="clear"
                            onClick={() => setSearchValue('')}
                        />
                    )}
                    <input
                        onChange={onChangeSearchInput}
                        value={searchValue}
                        type="text"
                        placeholder="Поиск..."
                    />
                </div>
            </div>
            <div className="d-flex flex-wrap">{renderItems()}</div>
        </div>
    );
};
