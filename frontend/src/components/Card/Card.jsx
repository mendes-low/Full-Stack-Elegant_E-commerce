import { useState, useEffect, useContext } from 'react';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

import './Card.css';

import likeIcon from '../../assets/images/card/card-heart.svg';
import likeIconRed from '../../assets/images/card/card-heart-red.svg';
// import starIcon from '../../assets/images/card/card-star.svg';
// import starEmptyIcon from '../../assets/images/card/card-empty-star.svg';

import WishlistContext from '../../context/wishlist/wishlist';
import CartContext from '../../context/cart/cart';

import reviewService from '../../services/review.service';

const Card = ({ card }) => {
    const { id, name, price, discount_price, rating, images, is_new } = card;
    const { addToCart, inCart, deleteFromCart } = useContext(CartContext);
    const { isWishlisted, toggleWishlist } = useContext(WishlistContext);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        reviewService
            .getReviews(card)
            .then(res => {
                calculateAverageRating(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const salePercent = Math.round((price - (discount_price || price)) / price * 100);

    const calculateAverageRating = (reviews) => {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const average = totalRating / reviews.length;
        setAverageRating(average);
    };

    const cutText = (text) => text.length > 27 ? `${text.slice(0, 27)}...` : text;

    function formatPrice(price) {
        let priceStr = String(price);
        if (priceStr.length <= 3) return priceStr;
        return formatPrice(priceStr.slice(0, -3)) + ',' + priceStr.slice(-3);
    }

    return (
        <div className='card'>
            <div className="card-img">
                <img src={`/images${images[0]}`} alt={name} />
                {is_new && <div className='card-new'><p>new</p></div>}
                {discount_price && <div className={is_new ? 'card-discount' : 'card-discount-without-new'}><p>-{salePercent}%</p></div>}
                <button className='card-button-like' onClick={() => toggleWishlist(id, isWishlisted(id) ? 'remove' : 'add')}>
                    <img src={isWishlisted(id) ? likeIconRed : likeIcon} alt="heart" />
                </button>
                {inCart(card)
                    ? <button className="card-button-cart" onClick={() => deleteFromCart(card)}><p>Added to cart</p></button>
                    : <button className="card-button-cart" onClick={() => addToCart(card)}><p>Add to cart</p></button>
                }
            </div>
            <Link to={`/card/${id}`}>
                <div className="card-content">
                    {/* <Rating
                        name="half-rating-read"
                        defaultValue={averageRating}
                        precision={0.5}
                        readOnly
                        icon={<img src={starIcon} />}
                        emptyIcon={<img src={starEmptyIcon} />}
                    /> */}
                    <p className="card-title">{cutText(name)}</p>
                    {discount_price ? (
                        <div className="card-price">
                            <p className='discount-price'>${formatPrice(discount_price)}</p>
                            <p className='price'>${formatPrice(price)}</p>
                        </div>
                    ) : (
                        <div className='card-price'>
                            <p className="discount-price">${formatPrice(price)}</p>
                        </div>
                    )
                    }
                </div>
            </Link>
        </div>
    );
};

export default Card;
