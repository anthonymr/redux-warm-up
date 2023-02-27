import { ChevronDown, ChevronUp } from "../icons";
import { removeItem, toggle } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CarItem = ({id, img, title, price, amount}) => {
    const dispatch = useDispatch();
    return (
        <article className="cart-item">
            <img src={img} alt={title} />
            <div>
                <h4>{title}</h4>
                <h4 className="item-price">${price}</h4>
                <button 
                    className="remove-btn"
                    onClick={() => dispatch(removeItem(id))}
                >
                    remove
                    </button>
            </div>
            <div>
                <button className="amount-btn" onClick={() => dispatch(toggle({id, action: 'increase'}))}>
                    <ChevronUp />
                </button>
                <p className="amount">{amount}</p>
                <button className="amount-btn" onClick={() => dispatch(toggle({id, action: 'decrease'}))}>
                    <ChevronDown />
                </button>
            </div>
        </article>
    );
};

export default CarItem;