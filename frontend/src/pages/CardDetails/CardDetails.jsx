import { useEffect, useState, useContext } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Rating from '@mui/material/Rating';
import TabContext from '@mui/lab/TabContext';
import { useParams } from 'react-router-dom';

// CSS
import './CardDetails.css';


// Icons
import Arrow from '../../assets/images/card/card-arrow.svg';
import starIcon from '../../assets/images/card/card-star.svg';
import starEmptyIcon from '../../assets/images/card/card-empty-star.svg';
import likeIcon from '../../assets/images/card/card-heart-black.svg';
import likeIconRed from '../../assets/images/card/card-heart-red.svg';
import plus from '../../assets/images/card/card-plus.svg';
import minus from '../../assets/images/card/card-minus.svg';
import userIcon from '../../assets/images/header/user-cicrle.svg';

import furnitureService from '../../services/furniture.service';
import reviewService from '../../services/review.service';

import CartContext from '../../context/cart/cart';

const CardDetails = () => {
  const [value, setValue] = useState('1');
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [averageRating, setAverageRating] = useState(0);

  const { addToCart, inCart, getFurnitureById, deleteFromCart, changeQuantity } = useContext(CartContext);

  const cartFurniture = getFurnitureById(product?.id);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      furnitureService
        .getFurnitureById(id)
        .then(res => {
          setProduct(res.data);
          return res.data;
        })
        .then(product => {
          if (product) {
            reviewService
              .getReviews(product)
              .then(res => {
                setReviews(res.data)
                calculateAverageRating(res.data);
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    }
  }, [id]);

  const postReview = () => {
    reviewService
      .addReview({ furnitureId: product.id, comment, rating })
      .then(res => {
        setReviews(prevReviews => {
          const updatedReviews = [...prevReviews, res.data];
          calculateAverageRating(updatedReviews);
          return updatedReviews;
        });
        setComment('')
        setRating(1)
      })
      .catch(err => console.log(err));
  };

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = totalRating / reviews.length;
    setAverageRating(average);
  };

  function formatPrice(price) {
    let priceStr = String(price);
    if (priceStr.length <= 3) return priceStr;
    return formatPrice(priceStr.slice(0, -3)) + ',' + priceStr.slice(-3);
  }

  return (
    <div className='card-details'>
      <div className='card-details-container'>
        <div className='card-details-header'>
          <span>
            <p className='card-details-header-default'>Home</p>
            <img src={Arrow} alt="arrow" />
          </span>
          <span>
            <p className='card-details-header-default'>Shop</p>
            <img src={Arrow} alt="arrow" />
          </span>
          <span>
            <p className='card-details-header-default'>{product?.category}</p>
            <img src={Arrow} alt="arrow" /></span>
          <span>
            <p className='card-details-header-active'>{product?.name}</p>
          </span>
        </div>
        <div className='card-details-info'>
          <div className='card-details-images'>
            {product?.images.map((image, index) => <img key={index} src={`/images${image}`} alt={`image ${index + 1}`} />)}
          </div>
          <div className='card-details-description'>
            <div className='card-details-discription-title'>
              <div className="card-details-rating">
                <p>{reviews?.length} Reviews</p>
              </div>
              <h6>{product?.name}</h6>
              {product?.discount_price ? (
                <div className='card-details-prices'>
                  <p className='card-details-discount-price'>${formatPrice(product?.discount_price)}</p>
                  <p className='card-details-original-price'>${formatPrice(product?.price)}</p>
                </div>
              ) : (
                <div className='card-details-price'>
                  <p className='card-details-discount-price'>${formatPrice(product?.price)}</p>
                </div>
              )}
            </div>
            <ColorPicker colors={product?.colors} />
            <div className='card-details-description-buttons'>
              <button className='card-details-description-button-like'>
                <img src={likeIcon} style={{ width: '24px', height: '24px', color: '#141718' }} alt="heart" />
                <p>Wishlist</p>
              </button>
              {product && inCart(product) ?
                <div className='card-details-description-button-cart-quantity'>
                  <div className='card-details-description-button-cart-quantity-content'>
                    <button onClick={() => changeQuantity(cartFurniture, 'dec')} disabled={cartFurniture.quantity === 1}>
                      <img src={minus} alt="minus" />
                    </button>
                    <p>{cartFurniture.quantity}</p>
                    <button onClick={() => changeQuantity(cartFurniture, 'inc')} disabled={cartFurniture.quantity === 99}>
                      <img src={plus} alt="plus" />
                    </button>
                  </div>
                  <button className='card-details-description-button-cart-quantity-remove' onClick={() => deleteFromCart(product)}>
                    <p>Remove from cart</p>
                  </button>
                </div>
                : <button className='card-details-description-button-cart' onClick={() => addToCart(product)}>
                  <p>Add to cart</p>
                </button>
              }
            </div>
            <div className='card-details-description-category'>
              <div className='card-details-description-category-title'>
                <p>SKU</p>
                <p>CATEGORY</p>
              </div>
              <div className='card-details-description-category-content'>
                <p>{product?.sku}</p>
                <p>{product?.category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Box sx={{ width: '100%' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: '#e8ecef' }}>
            <TabList
              onChange={handleChangeTab}
              textColor="primary"
              indicatorColor="primary"
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#121212',
                },
              }}
              sx={{
                '& .MuiTab-root': {
                  marginRight: '20px',
                  textTransform: 'none',
                  color: (theme) => theme.palette.grey[500],
                  '&.Mui-selected': {
                    color: '#121212',
                  },
                },
              }}
            >
              <Tab
                label="Additional Info"
                value="1"
                sx={{
                  fontSize: '16px',
                  fontWeight: 550,
                }}
              />
              <Tab
                label="Reviews"
                value="2"
                sx={{
                  fontSize: '16px',
                  fontWeight: 550,
                }}
              />
            </TabList>
          </Box>
          <TabPanel value="1" className='card-details-additional-info'>
            <h3 style={{ color: '#6C7275' }}>Details:</h3>
            <p>{product?.details}</p>
            <div className='card-details-additional-info-packaging'>
              <h3 style={{ color: '#6C7275' }}>Packaging:</h3>
              <p>Width: {product?.packaging.width}</p>
              <p>Height: {product?.packaging.height}</p>
              <p>Depth: {product?.packaging.depth}</p>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className='card-details-reviews'>
              <div className='card-details-reviews-customer'>
                <h3>Costomer Reviews</h3>
                <div className='card-details-reviews-rating'>
                  <Rating
                    name="half-rating-read"
                    defaultValue={averageRating}
                    precision={0.5}
                    readOnly
                    icon={<img src={starIcon} />}
                    emptyIcon={<img src={starEmptyIcon} />}
                  />
                  <p>{reviews?.length} reviews</p>
                </div>
                <div className='card-details-reviews-new'>
                  <Rating
                    name="half-rating-read"
                    defaultValue={rating}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                    size='large'
                    icon={<img src={starIcon} style={{ width: '25px', height: '25px' }} />}
                    emptyIcon={<img src={starEmptyIcon} style={{ width: '25px', height: '25px' }} />}
                  />
                  <input
                    type="text"
                    placeholder='Write a review'
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />
                  <button onClick={comment === '' ? [] : postReview} disabled={comment === ''}>
                    <p>Post a review</p>
                  </button>
                </div>
              </div>
              <div className='card-details-reviews-items'>
                {reviews ?
                  reviews.map((review) => (
                    <div key={review.id} className='card-details-reviews-item'>
                      <img src={userIcon} alt="avatar"style={{ width: '50px', height: '50px' }} />
                      <div className='card-details-reviews-item-content'>
                        <h4>{review.fullname}</h4>
                        <Rating
                          name="half-rating-read"
                          defaultValue={review.rating}
                          precision={0.5}
                          readOnly
                          icon={<img src={starIcon} />}
                          emptyIcon={<img src={starEmptyIcon} />}
                        />
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  ))
                  : (
                    <p>No reviews yet</p>
                  )}
              </div>
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  )
}

export default CardDetails;

const ColorPicker = ({ colors = [] }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0] || {});

  useEffect(() => {
    if (colors.length > 0) {
      setSelectedColor(colors[0]);
    }
  }, [colors]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '8px' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <p className='card-details-color-title'>Choose color</p>
        <img src={Arrow} style={{ width: '17px', height: '17px', color: '#6C7275' }} alt="arrow" />
      </span>
      <div className='card-details-description-color' style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '16px' }}>
        <h2 className='card-details-color-name'>{selectedColor.name}</h2>
        <ul style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '8px' }}>
          {colors.map((color, index) => (
            <li
              key={index}
              onClick={() => setSelectedColor(color)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                listStyleType: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                padding: color === selectedColor ? '4px' : '0px',
                border: color === selectedColor ? '2px solid #141718' : '2px solid #4f4f4f7f',
              }}
            >
              <div style={{
                backgroundColor: color.hex,
                borderRadius: '50%',
                width: color === selectedColor ? '37px' : '45px',
                height: color === selectedColor ? '37px' : '45px',
                boxShadow: color === selectedColor ? '0px 0px 15px 0px #7777777d' : 'none',
              }} />

            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};


