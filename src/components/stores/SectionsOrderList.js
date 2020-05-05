import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SectionCard from "./SectionCard";
import update from "immutability-helper";

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

const SectionsOrderList = ({
  order,
  onOrderSave,
  onSectionAdd,
  onSectionDelete,
  sections,
}) => {
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [sectionsOrder, setSectionsOrder] = useState([...order]);
  const [sectionToAdd, setSectionToAdd] = useState({
    ...sections[0],
    sectionOrder: order.length,
  });

  useEffect(() => {
    setSectionsOrder([...order]);
  }, [order]);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragSection = {
        ...sectionsOrder[dragIndex],
        sectionOrder: hoverIndex,
      };
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

  const addSection = (event) => {
    event.preventDefault();
    onSectionAdd(sectionToAdd);
  };

  const onSelectChange = (event) => {
    setSectionToAdd({
      ...sections.find(
        (section) => section.id === parseInt(event.target.value)
      ),
      sectionOrder: sectionsOrder.length,
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
            <select name={"section"} onChange={onSelectChange}>
              {sections.map((section) => {
                return (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                );
              })}
            </select>
            <button
              type="submit"
              className="btn btn-outline-success"
              style={{ display: "inline-block", textAlign: "center" }}
              onClick={addSection}
            >
              Dodaj
            </button>
          </form>
        ) : (
          <button
            className="btn btn-outline-success"
            onClick={() => setShowAddPanel(true)}
          >
            Dodaj dział
          </button>
        )}
      </div>
      {sectionsOrder.length === 0 ? (
        <></>
      ) : (
        <div className="sectionsOrderContaier" style={orderContainer}>
          {sectionsOrder.map((section, index) => {
            return (
              <SectionCard
                key={section.id}
                index={index}
                id={section.id}
                text={section.sectionName}
                moveCard={moveCard}
                onSectionDelete={() => onSectionDelete(section)}
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
      )}
    </div>
  );
};

SectionsOrderList.propTypes = {
  order: PropTypes.array.isRequired,
  onOrderSave: PropTypes.func.isRequired,
  sections: PropTypes.array.isRequired,
  onSectionAdd: PropTypes.func.isRequired,
  onSectionDelete: PropTypes.func.isRequired,
};

export default SectionsOrderList;
