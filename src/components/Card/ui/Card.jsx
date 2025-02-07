import React from 'react';
import ContentLoader from 'react-content-loader';

import { AppContext } from '../../../Context';

import styles from './Card.module.scss';

export function Card({
    title,
    price,
    img,
    onPlus,
    onFavorite,
    favorited = false,
    id,
    loading = false,
}) {
    const { isItemAdded, isItemAddedToFavorite } = React.useContext(AppContext);
    const obj = { title, parentId: id, price, img: String(img), id };

    const onClickPlus = () => {
        onPlus(obj);
    };

    const onClickFavorite = async () => {
        onFavorite(obj);
    };

    return (
        <div className={styles.card}>
            {loading ? (
                <ContentLoader
                    speed={2}
                    width={160}
                    height={265}
                    viewBox="0 0 160 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect
                        x="0"
                        y="180"
                        rx="10"
                        ry="10"
                        width="100"
                        height="15"
                    />
                    <rect
                        x="0"
                        y="220"
                        rx="10"
                        ry="10"
                        width="80"
                        height="32"
                    />
                    <rect
                        x="124"
                        y="220"
                        rx="10"
                        ry="10"
                        width="32"
                        height="32"
                    />
                    <rect
                        x="0"
                        y="0"
                        rx="10"
                        ry="10"
                        width="160"
                        height="130"
                    />
                    <rect
                        x="0"
                        y="150"
                        rx="10"
                        ry="10"
                        width="160"
                        height="15"
                    />
                </ContentLoader>
            ) : (
                <>
                    <div className={styles.favorite} onClick={onFavorite}>
                        {onFavorite && (
                            <img
                                width={32}
                                height={32}
                                onClick={onClickFavorite}
                                src={
                                    isItemAddedToFavorite(title)
                                        ? 'img/heart-liked.svg'
                                        : 'img/heart-unliked.svg'
                                }
                                alt="unliked"
                            />
                        )}
                    </div>
                    <img width={133} height={133} src={img} alt="" />
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена:</span>
                            <b>{price} руб.</b>
                        </div>
                        {onPlus && (
                            <img
                                className={styles.plus}
                                width={11}
                                height={11}
                                src={
                                    isItemAdded(id)
                                        ? 'img/btn-checked.svg'
                                        : 'img/btn-plus.svg'
                                }
                                alt="plus"
                                onClick={onClickPlus}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
