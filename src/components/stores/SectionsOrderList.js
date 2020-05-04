import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import SectionCard from "./SectionCard";
import update from "immutability-helper";
import InlineSelectInput from "../common/InlineSelectInput";

const orderContainer = {
  margin: "15px auto",
  textAlign: "center",
};

const inline = {
  margin: "15px auto",
  textAlign: "center",
  display: "inline-block",
  width: "850px",
};

const saveOrderButton = {
  margin: "15px",
};

const SectionsOrderList = ({ order, onOrderSave, sections }) => {
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [sectionsOrder, setSectionsOrder] = useState(order);
  const [sectionToAdd, setSectionToAdd] = useState({
    section: sections[0].name,
  });

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      console.log(sectionsOrder);
      const dragSection = sectionsOrder[dragIndex];
      setSectionsOrder(
        update(sectionsOrder, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragSection],
          ],
        })
      );
    },
    [sectionsOrder]
  );

  const addSection = () => {
    setSectionsOrder([sectionToAdd, ...sectionsOrder]);
  };

  const onSelectChange = (event) => {
    const { name, value } = event.target;
    setSectionToAdd((prevSection) => {
      return {
        [name]: value,
        ...prevSection,
      };
    });
  };

  return (
    <div>
      <h4>Kolejność działów</h4>
      <div style={inline}>
        {showAddPanel ? (
          <form
            onSubmit={addSection}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <InlineSelectInput
              name={"section"}
              style={{ padding: "5px", margin: "0 15px" }}
              onChange={onSelectChange}
              options={sections.map((section) => section.name)}
            />
            <button
              type="submit"
              className="btn btn-outline-success"
              style={{ display: "inline-block", textAlign: "center" }}
              onClick={() => {
                addSection();
                setShowAddPanel(!showAddPanel);
              }}
            >
              Dodaj
            </button>
          </form>
        ) : (
          <button
            className="btn btn-outline-success"
            onClick={() => setShowAddPanel(!showAddPanel)}
          >
            Dodaj dział
          </button>
        )}
      </div>
      <div className="sectionsOrderContaier" style={orderContainer}>
        {sectionsOrder.map((section, index) => {
          return (
            <SectionCard
              key={section.id}
              index={index}
              id={section.id}
              text={section.sectionName}
              moveCard={moveCard}
            />
          );
        })}
        <button
          className="btn btn-primary"
          style={saveOrderButton}
          onClick={() => onOrderSave(sectionsOrder)}
        >
          Zapisz kolejność
        </button>
      </div>
    </div>
  );
};

SectionsOrderList.propTypes = {
  order: PropTypes.array.isRequired,
  onOrderSave: PropTypes.func.isRequired,
  sections: PropTypes.array.isRequired,
};

export default SectionsOrderList;
