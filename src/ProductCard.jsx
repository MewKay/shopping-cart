import PropTypes from "prop-types";

const ProductCard = ({ imgURL, title, price, indexToShow, onClick }) => {
  return (
    <button onClick={() => onClick(indexToShow)}>
      <div className="product-image">
        <img src={imgURL} alt="" />
      </div>
      <p>{title}</p>
      <p>${price}</p>
    </button>
  );
};

ProductCard.propTypes = {
  imgURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  indexToShow: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProductCard;
