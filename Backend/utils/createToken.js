// import jwt from 'jsonwebtoken'

// const generateToken = (res, userID) =>{
//     const token = jwt.sign({userID}, process.env.JWT_SECRET_KEY, 
//         { expiresIn: '30d'}
//     )

    
// //set JWT as an HTTP-ONLY cookie
// const isProduction = process.env.NODE_ENV === 'production';

// res.cookie('jwt', token, {
//     httpOnly: true,
//     secure: isProduction, // Secure in production, not in development
//     sameSite: isProduction ? 'None' : 'Lax',
//     maxAge: 30*24*60*60*1000,

// })

//     console.log('Cookie set:', res.getHeader('Set-Cookie'));
//     res.status(200).json({ message: 'Cookie set successfully' });
//     return token;
// }

// export default generateToken;


import jwt from 'jsonwebtoken'

const generateToken = (res, userID) =>{
    const token = jwt.sign({userID}, process.env.JWT_SECRET_KEY, 
        { expiresIn: '30d'}
    )

    
//set JWT as an HTTP-ONLY cookie

res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV || 'development',
    sameSite: 'strict',
    maxAge: 30*24*60*60*1000,

})

    return token;
}

export default generateToken;
