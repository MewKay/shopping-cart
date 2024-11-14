import PropTypes from "prop-types";

const CartModalItem = ({ image, title, price, quantity }) => {
  return (
    <li>
      <div>
        <img src={image} alt="" />
      </div>
      <div>
        <p>{title}</p>
        <p>
          {quantity} x ${price}
        </p>
      </div>
    </li>
  );
};

CartModalItem.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartModalItem;
