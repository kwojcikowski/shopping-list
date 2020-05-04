import React, { useState } from "react";
import PropTypes from "prop-types";
import StoreImage from "../../../resources/Lidl_sredzka.svg";
import * as supportedStoresActions from "../../redux/actions/supportedStoresActions";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import { connect } from "react-redux";
import SectionsOrderList from "./SectionsOrderList";
import Spinner from "../common/Spinner";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import { toast } from "react-toastify";

const ManageStore = ({
  store,
  supportedStores,
  updateStoreOrder,
  sections,
}) => {
  const [showLayout, setShowLayout] = useState(false);

  const onOrderSave = (newOrder) => {
    updateStoreOrder({ order: newOrder, ...store }).then(
      toast.success("Udało się zapisać kolejność!")
    );
  };

  if (supportedStores.length === 0) return <Spinner />;
  return (
    <>
      <h2>{store.fullName}</h2>
      <DndProvider backend={Backend}>
        <SectionsOrderList
          order={store.order}
          onOrderSave={onOrderSave}
          sections={sections}
        />
      </DndProvider>
      <button onClick={() => setShowLayout(!showLayout)}>
        {showLayout ? "Schowaj mapkę " : "Pokaż mapkę sklepu "}
        {showLayout ? <FaAngleDown /> : <FaAngleRight />}
      </button>
      {showLayout ? <img src={StoreImage} alt={store.fullName} /> : <></>}
    </>
  );
};

ManageStore.propTypes = {
  store: PropTypes.object.isRequired,
  supportedStores: PropTypes.array.isRequired,
  updateStoreOrder: PropTypes.func.isRequired,
  sections: PropTypes.array.isRequired,
};

const findStoreBySlug = (slug, supportedStores) => {
  return supportedStores.find((store) => store.tableReference === slug) || null;
};

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const store =
    slug && state.supportedStores.length > 0
      ? findStoreBySlug(slug, state.supportedStores)
      : { tableReference: "", fullName: "" };
  return {
    store,
    supportedStores: state.supportedStores,
    sections: state.sections,
  };
};

const mapDispatchToProps = {
  updateStoreOrder: supportedStoresActions.updateStoreOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageStore);
