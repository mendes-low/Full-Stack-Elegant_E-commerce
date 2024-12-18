import { Link } from "react-router-dom";
import SimpleBar from 'simplebar-react';
import { useEffect, useState } from 'react';
import 'simplebar-react/dist/simplebar.min.css';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';

import './CardWrapper.css';
import Card from "../Card/Card";

import furnitureService from '../../services/furniture.service';

const CardWrapper = () => {
    const [furnitures, setFurnitures] = useState(null);

    useEffect(() => {
        furnitureService
            .getNewFurnitures()
            .then(res => setFurnitures(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="card-wrapper">
            <div className='card-wrapper-title'>
                <p>New Arrivals</p>
                <button>
                    <Link to='/shop' className="card-wrapper-title-link">More Products <EastOutlinedIcon style={{ color: '#141718', fontSize: '20px' }} /></Link>
                </button>
            </div>
            <SimpleBar className="cards-scrollbar" forceVisible="x" autoHide={false} >
                <div className="cards-container">
                    {furnitures && furnitures.map(furnitures => <Card key={furnitures.id} card={furnitures} />)}
                </div>
            </SimpleBar>
        </div>
    );
}

export default CardWrapper;
