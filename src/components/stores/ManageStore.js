import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import StoreImage from "../../../resources/Lidl_sredzka.svg";
import * as storeActions from "../../redux/actions/storeActions";
import * as storeSectionsActions from "../../redux/actions/storeSectionsActions";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import { connect } from "react-redux";
import SectionsOrderList from "./SectionsOrderList";
import Spinner from "../common/Spinner";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import { toast } from "react-toastify";
import { sortBy, isEmpty } from "underscore";

const ManageStore = ({
  apiCallsInProgress,
  store,
  storeSectionsItems,
  slug,
  loadStoreByUrlFriendlyName,
  loadStoreSectionsByStoreUrlFriendlyName,
}) => {
  const [showLayout, setShowLayout] = useState(false);

  useEffect(() => {
    loadStoreByUrlFriendlyName(slug);
    loadStoreSectionsByStoreUrlFriendlyName(slug);
  }, []);

  // const onOrderSave = (newOrder) => {
  //   updateStoreOrder({
  //     ...store,
  //     order: newOrder.map((section, index) => ({
  //       ...section,
  //       sectionOrder: index,
  //     })),
  //   }).then(toast.success("Udało się zapisać kolejność!"));
  // };
  //
  // const onSectionAdd = (section) => {
  //   addSectionToOrder(section, store)
  //     .then(() => {
  //       toast.success(`Dział ${section.name} dodany.`);
  //     })
  //     .catch(() => {
  //       toast.error("Dodawanie działu nie powiodło się.");
  //     });
  // };
  //
  // const onSectionDelete = (section) => {
  //   deleteSectionFromOrder(store, section)
  //     .then(() => {
  //       toast.success(`Dział ${section.sectionName} usunięty z kolejki.`);
  //     })
  //     .catch(() => {
  //       toast.error("Usunięcie działu nie powiodło się.");
  //     });
  // };

  return (
    <>
      {apiCallsInProgress ? (
        <Spinner />
      ) : (
        <>
          <h2>{store.name}</h2>
          {storeSectionsItems.map((storeSectionsItem) => (
            <div key={storeSectionsItem._links.self.href}>
              {storeSectionsItem.section.name}
            </div>
          ))}
          {/*<DndProvider backend={Backend}>*/}
          {/*  <SectionsOrderList*/}
          {/*    order={sortBy(store.order, "sectionOrder")}*/}
          {/*    onOrderSave={onOrderSave}*/}
          {/*    onSectionAdd={onSectionAdd}*/}
          {/*    onSectionDelete={onSectionDelete}*/}
          {/*    sections={sections}*/}
          {/*  />*/}
          {/*</DndProvider>*/}
          <button onClick={() => setShowLayout(!showLayout)}>
            {showLayout ? "Schowaj mapkę " : "Pokaż mapkę sklepu "}
            {showLayout ? <FaAngleDown /> : <FaAngleRight />}
          </button>
          {showLayout ? <img src={StoreImage} alt={store.fullName} /> : <></>}
        </>
      )}
    </>
  );
};

ManageStore.propTypes = {
  slug: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
  storeSectionsItems: PropTypes.array.isRequired,
  loadStoreByUrlFriendlyName: PropTypes.func.isRequired,
  loadStoreSectionsByStoreUrlFriendlyName: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    apiCallsInProgress: state.apiCallsInProgress > 0,
    slug: ownProps.match.params.slug,
    store: state.store,
    storeSectionsItems: isEmpty(state.storeSections)
      ? []
      : state.storeSections._embedded.storeSections,
  };
};

const mapDispatchToProps = {
  loadStoreByUrlFriendlyName: storeActions.loadStoreByUrlFriendlyName,
  loadStoreSectionsByStoreUrlFriendlyName:
    storeSectionsActions.loadStoreSectionsByStoreUrlFriendlyName,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageStore);
