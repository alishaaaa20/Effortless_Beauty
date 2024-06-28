import PropTypes from "prop-types";

const AreaCard = ({ cardInfo }) => {
  return (
    <div className="container w-[200px] p-2 bg-white shadow-lg">
      <div className="">
        <h5 className="info-title">{cardInfo.title}</h5>
        <div className="flex justify-between ">
          <div className="info-value">{cardInfo.value}</div>
          <div className="info-icon">{cardInfo.icon}</div>
        </div>
        <p className="info-text">{cardInfo.text}</p>
      </div>
    </div>
  );
};

export default AreaCard;

AreaCard.propTypes = {
  cardInfo: PropTypes.object.isRequired,
};
