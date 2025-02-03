import { Card } from '../components/Card';
import React from 'react';
import axios from 'axios';

export const Orders = () => {
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    'https://679b63a733d316846323ad48.mockapi.io/orders'
                );
                setOrders(
                    data.reduce((acc, curr) => [...acc, ...curr.items], [])
                );
                setIsLoading(false);
            } catch (error) {
                console.log('Ошибка при получения списка заказов');
            }
        };

        fetchData();
    }, []);

    return (
        <div className="content p-40 ">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои заказы</h1>
            </div>
            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(8)] : orders).map((item, i) => (
                    <Card key={i} {...item} loading={isLoading} />
                ))}
            </div>
        </div>
    );
};
