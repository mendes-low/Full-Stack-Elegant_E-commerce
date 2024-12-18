import { useState, useEffect, useContext } from "react";

import wishlistService from "../../services/wishlist.service";

import WishlistContext from "./wishlist";
// import { UserContext } from '../user/user';

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    // const { user } = useContext(UserContext);

    useEffect(() => {
        // if (user) {
            updateWishlist();
        // }
    }, []);

    const updateWishlist = () => {
        wishlistService.getWishlist()
            .then(res => {
                setWishlist(res.data);
            })
            .catch(err => console.error(err));
    };

    const toggleWishlist = (id, action) => {
        if (action === 'add') {
            wishlistService.addWishlist(id)
                .then(res => updateWishlist())
                .catch(err => console.error(err));
        } else if (action === 'remove') {
            wishlistService.deleteWishlist(id)
                .then(res => updateWishlist())
                .catch(err => console.error(err));
        }
    };

    const isWishlisted = (id) => {
        if (wishlist.length === 0) return false
        return wishlist.some(item => item.furniture_id === id);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistProvider;

// export const useWishlist = () => useContext(WishlistContext);
