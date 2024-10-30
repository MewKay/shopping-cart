import PropTypes from "prop-types";

const ProductCard = ({ title }) => {
  return <li>{title}</li>;
};

ProductCard.propTypes = {
  title: PropTypes.string,
};

export default ProductCard;
