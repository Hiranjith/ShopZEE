import React from 'react';

const Message = ({variant, childComponent}) => {
    const getVariant = () => {
        switch (variant) {
            case "success":
                return "bg-green-500 text-white";
                break;
            case "danger" :    
                return "bg-red-500 text-black";
                break;
            default:
                return "bg-blue-500 text-black"
                break;
        }
    }
    return (
        <div className={`p-4 rounded ${getVariant()}`} >{childComponent}</div>
    );
}

export default Message;
