import './Categories.css'

import { Link } from 'react-router-dom'

const Categories = () => {
    return (
        <div className='categories'>
            <h2>Shop By Categories</h2>
            <div className='categories-rows'>
                <Link to='/shop' className='categories-row'>
                    <img src={`/images/algona/algona1.png`} alt="kitchen" />
                    <p>Kitchen</p>
                </Link>
                <Link to='/shop' className='categories-row'>
                    <img src={`/images/naomi/naomi1.png`} alt="living-room" />
                    <p>Living room</p>
                </Link>
                <Link to='/shop' className='categories-row'>
                    <img src={`/images/laksha/laksha1.png`} alt="bedroom" />
                    <p>Bedroom</p>
                </Link>
                <Link to='/shop' className='categories-row'>
                    <img src={`/images/parise/parise1.png`} alt="" />
                    <p>Bathroom</p>
                </Link>
                <Link to='/shop' className='categories-row'>
                    <img src={`/images/aster/aster1.png`} alt="" />
                    <p>Dining</p>
                </Link>
                <Link to='/shop' className='categories-row'>
                    <img src={`/images/maylin/maylin1.png`} alt="" />
                    <p>Outdoor</p>
                </Link>
            </div>
        </div>
    )
}

export default Categories;





