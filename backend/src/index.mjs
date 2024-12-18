import cors from 'cors';
import path from 'path';
import pool from './db.mjs';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import './helpers/local-strategy.mjs';
const pgSession = pgSimpleSession(session);
import pgSimpleSession from 'connect-pg-simple';

// Routes
import CartRouter from './routes/cart.mjs';
import UserRouter from './routes/user.mjs';
import AuthRouter from './routes/auth.mjs';
import WishlistRouter from './routes/wishlist.mjs';
import FurnitureRouter from './routes/furniture.mjs';
import ReviewRouter from './routes/review.mjs';

const app = express();

const __dirname = path.resolve();

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: new pgSession({
        pool: pool,
        tableName: 'session'
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(CartRouter);
app.use(UserRouter);
app.use(AuthRouter);
app.use(ReviewRouter);
app.use(WishlistRouter);
app.use(FurnitureRouter);

const appStart = () => {
    try {
        app.listen(8000, () => {
            console.log('Server is running on port 8000');
        });
    } catch (error) {
        console.log('Error: ', error);
    }
}

appStart();