import { useState, useEffect } from 'react'

import './Shop.css'

import Card from '../../components/Card/Card';

import furnitureService from '../../services/furniture.service';

const Shop = () => {
  const [furnitures, setFurnitures] = useState([]);
  const [category, setCategory] = useState('All rooms');
  const [price, setPrice] = useState({ min: 0, max: 0 });
  const [sortOrder, setSortOrder] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getFurnitures();
  }, [category, price, search, sortOrder]);

  function getFurnitures() {
    furnitureService
      .getFilteredFurnitures(category, price.min, price.max, sortOrder, search)
      .then((res) => setFurnitures(res.data || []))
      .catch((err) => console.log(err));
  }

  return (
    <div className='shop'>
      <div className='shop-container'>
        <div className='shop-toolbar'>
          <input
            value={search || ''}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search furnitures..."
            type="search"
          />
          <div className='shop-toolbar-filters'>
            <div className="shop-toolbar-filters-content">
              <div className='shop-toolbar-filters-item'>
                <p>CATEGORIES</p>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="All rooms">All rooms</option>
                  <option value="Living room">Living room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Bathroom">Bathroom</option>
                  <option value="Dining">Dining</option>
                  <option value="Outdoor">Outdoor</option>
                </select>
              </div>
              <div className='shop-toolbar-filters-item'>
                <p>PRICE</p>
                <select
                  value={JSON.stringify(price)}
                  onChange={(e) => setPrice(JSON.parse(e.target.value))}
                >
                  <option value={JSON.stringify({ min: 0, max: 0 })}>All price</option>
                  <option value={JSON.stringify({ min: 0, max: 99 })}>$0 - 99</option>
                  <option value={JSON.stringify({ min: 100, max: 199 })}>$100 - 199</option>
                  <option value={JSON.stringify({ min: 200, max: 299 })}>$200 - 299</option>
                  <option value={JSON.stringify({ min: 300, max: 399 })}>$300 - 399</option>
                  <option value={JSON.stringify({ min: 400, max: 0 })}>$400+</option>
                </select>
              </div>
            </div>
            <select
              className='shop-toolbar-sort'
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="price_desc">From high to low price</option>
              <option value="price_asc">From low to high price</option>
            </select>
          </div>
        </div>
        <div className='shop-cards'>
          {furnitures ?
            furnitures.map(furniture => (
              <Card key={furniture.id} card={furniture} />
            )) :
            <div>Not found</div>
          }
        </div>
      </div>
    </div>
  )
}

export default Shop