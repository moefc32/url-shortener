import { VITE_SECRET_KEY } from '$env/static/private'
import jwt from 'jsonwebtoken';

export default function checkCookies(token) {
    if (!token) return false;

    try {
        const verify = jwt.verify(token, VITE_SECRET_KEY);
        return verify;
    } catch (e) {
        return false;
    }
}
