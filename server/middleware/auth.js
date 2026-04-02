import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {

        
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({message: 'No token provided'});
        }


        // We extract the token
        const token = authHeader.split(' ')[1];


        // We verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // We save the user ID in the request
        req.user = { userId: decoded.id};

        next();

    } catch(error){
        res.status(401).json({message: error.message});
    }
}

export default authMiddleware;