import React, { useEffect } from "react";
import { useQuery, makeVar } from "@apollo/client";
import M from "materialize-css";
import { GET_FILTERS } from "../../queries/filter";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewGroupFilter,
  updateTarget,
  addGroupFilter,
} from "../../features/filter_group/groupSlice";

// export const newGroupItems = makeVar([]);

export const Category = () => {
  const { error, loading, data } = useQuery(GET_FILTERS);
  const dispatch = useDispatch();
  const newGroup = useSelector((state) => state.group.newGroup);
  const targetGroupId = useSelector((state) => state.group.target);
  const filterGroups = useSelector((state) => state.group.data);

  useEffect(() => {
    let options = {
      // accordion: false,
    };
    let elems = document.querySelectorAll(".collapsible");
    let instances = M.Collapsible.init(elems, options);
  });

  let targetGroup;
  if (targetGroupId !== "newGroup" && targetGroupId) {
    targetGroup = filterGroups.filter((g) => g.groupId === targetGroupId)[0];
  }

  const noFilters = () => {
    return (
      <ul className="collapsible">
        <li>
          <div className="collapsible-header">Standard</div>
        </li>
        <li>
          <div className="collapsible-header">Supply</div>
        </li>
        <li>
          <div className="collapsible-header">Liquidity</div>
        </li>
        <li>
          <div className="collapsible-header">Marketcap</div>
        </li>
        <li>
          <div className="collapsible-header">Volume</div>
        </li>
        <li>
          <div className="collapsible-header">ROI</div>
        </li>
      </ul>
    );
  };

  const handleClick = (e) => {
    if (targetGroupId === "newGroup") {
      let dupFlag = false;
      for (let d of newGroup.filterDetails) {
        if (d.filterId === e.target.id) {
          dupFlag = true;
        }
      }
      if (dupFlag === false) {
        dispatch(
          addNewGroupFilter({
            filterDetails: [
              {
                filterId: e.target.id,
                filterName: e.target.dataset.name,
                filterContent: e.target.dataset.content,
              },
            ],
          })
        );
      }
    } else {
      let dupFlag = false;
      for (let d of targetGroup.filterDetails) {
        if (d.filterId === e.target.id) {
          dupFlag = true;
        }
      }
      if (dupFlag === false) {
        dispatch(
          addGroupFilter({
            groupId: targetGroupId,
            filterDetails: [
              {
                filterId: e.target.id,
                filterName: e.target.dataset.name,
                filterContent: e.target.dataset.content,
              },
            ],
          })
        );
      }
    }
  };

  if (error) {
    console.log(error);
    return noFilters();
  }
  if (loading) {
    return noFilters();
  }
  if (data) {
    const { filters } = data;
    let standard_list = filters.edges
      .filter((f) => f.node?.category === "Standard")
      .map((f) => {
        return (
          <div
            className="collapsible-body center padding-1rem group-category"
            key={f.node?.id}
            id={f.node?.id}
            onClick={handleClick}
            data-name={f.node?.filterName}
            data-content={f.node?.filterContent}
          >
            {f.node?.filterName}
          </div>
        );
      });

    let supply_list = filters.edges
      .filter((f) => f.node?.category === "Supply")
      .map((f) => (
        <div
          className="collapsible-body center padding-1rem group-category"
          key={f.node?.id}
          id={f.node?.id}
          onClick={handleClick}
          data-name={f.node?.filterName}
          data-content={f.node?.filterContent}
        >
          {f.node?.filterName}
        </div>
      ));

    let liquidity_list = filters.edges
      .filter((f) => f.node?.category === "Liquidity")
      .map((f) => (
        <div
          className="collapsible-body center padding-1rem group-category"
          key={f.node?.id}
          id={f.node?.id}
          onClick={handleClick}
          data-name={f.node?.filterName}
          data-content={f.node?.filterContent}
        >
          {f.node?.filterName}
        </div>
      ));

    let marketcap_list = filters.edges
      .filter((f) => f.node?.category === "Marketcap")
      .map((f) => (
        <div
          className="collapsible-body center padding-1rem group-category"
          key={f.node?.id}
          id={f.node?.id}
          onClick={handleClick}
          data-name={f.node?.filterName}
          data-content={f.node?.filterContent}
        >
          {f.node?.filterName}
        </div>
      ));

    let volume_list = filters.edges
      .filter((f) => f.node?.category === "Volume")
      .map((f) => (
        <div
          className="collapsible-body center padding-1rem group-category"
          key={f.node?.id}
          id={f.node?.id}
          onClick={handleClick}
          data-name={f.node?.filterName}
          data-content={f.node?.filterContent}
        >
          {f.node?.filterName}
        </div>
      ));

    let roi_list = filters.edges
      .filter((f) => f.node?.category === "ROI")
      .map((f) => (
        <div
          className="collapsible-body center padding-1rem group-category"
          key={f.node?.id}
          id={f.node?.id}
          onClick={handleClick}
          data-name={f.node?.filterName}
          data-content={f.node?.filterContent}
        >
          {f.node?.filterName}
        </div>
      ));

    return (
      <ul className="collapsible">
        <li>
          <div className="collapsible-header">Standard</div>
          {standard_list}
        </li>
        <li>
          <div className="collapsible-header">Supply</div>
          {supply_list}
        </li>
        <li>
          <div className="collapsible-header">Liquidity</div>
          {liquidity_list}
        </li>
        <li>
          <div className="collapsible-header">Marketcap</div>
          {marketcap_list}
        </li>
        <li>
          <div className="collapsible-header">Volume</div>
          {volume_list}
        </li>
        <li>
          <div className="collapsible-header">ROI</div>
          {roi_list}
        </li>
      </ul>
    );
  }

  return noFilters();
};
