import { Link } from 'react-router-dom';
import HeartIcon from './HeartIcon';

const SmallProducts = ({ product }) => {
    return (
        <div className="w-56 mx-auto p-3 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
            <div className="relative w-full">
            <Link to={`/product/${product._id}`} className='block'>
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-36 w-full object-cover rounded-t-lg"
                />
            </Link>
                <HeartIcon product={product} />
            </div>
            <div className="p-2 w-full text-center">
                <Link to={`/product/${product._id}`}>
                    <h2 className="text-sm font-medium text-gray-800 hover:text-blue-500 transition-colors truncate">
                        {product.name}
                    </h2>
                </Link>
                <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-500 text-xs truncate">{product.description}</span>
                    <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                        ₹{product.price}
                    </span>
                </div>
            </div>
        </div>
    );
    
    
};

export default SmallProducts;
