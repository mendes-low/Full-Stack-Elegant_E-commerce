// import { useState, useEffect } from "react";

// import reviewService from '../../services/review.service';

// import reviewContext from './review';

// const ReviewProvider = ({ children }) => {
//     const [reviews, setReviews] = useState();

//     function getReviews(product) {
//         reviewService
//             .getReviews(product)
//             .then(res => {
//                 setReviews(res.data)
//             })
//             .catch(err => console.log(err));
//     }



//     return (
//         <reviewContext.Provider value={{ reviews, getReviews }}  >
//             {children}
//         </reviewContext.Provider>
//     );
// }