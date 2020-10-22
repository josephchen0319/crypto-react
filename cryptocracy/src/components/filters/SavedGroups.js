import React, { useEffect } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css";
import { GET_FILTER_GROUPS } from "../../queries/member";
import { NewGroup } from "./NewGroup";
import {
  DELETE_FILTER_GROUP,
  UPDATE_FILTER_GROUP,
} from "../../mutations/member";
import { useHistory } from "react-router-dom";
import {
  fetchGroups,
  updateTarget,
  // deleteGroup,
  deleteGroupFilter,
  updateGroup,
} from "../../features/filter_group/groupSlice";
import { updateFilterDetails } from "../../features/market/searchResultSlice";
import ArgumentInput from "./ArgumentInput";
import Loading from "../misc/Loading";
import { fetchSearchResult } from "../../features/market/searchResultSlice";
import { GET_FILTERED_COIN_LIST } from "../../queries/filter";

export const SavedGroups = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.group.status);
  const targetGroupId = useSelector((state) => state.group.target);
  const filterGroups = useSelector((state) => state.group.data);
  const searchStatus = useSelector((state) => state.searchResult.status);

  const { data, loading, error } = useQuery(GET_FILTER_GROUPS);
  // const [me, { data, loading, error }] = useLazyQuery(GET_FILTER_GROUPS);
  let readyToBeDeletedGroupId;
  const [deleteFilterGroup] = useMutation(DELETE_FILTER_GROUP, {
    onCompleted: (data) => {
      history.go(0);
    },
  });

  const [updateFilterGroup] = useMutation(UPDATE_FILTER_GROUP, {
    onError: (err) => {
      console.log(err);
    },
    onCompleted: () => {
      M.toast({ html: "Successfully saved", displayLength: 1500 });
    },
  });

  const [
    filteredCoinlist,
    { data: filteredData, loading: filteredLoading, error: filteredError },
  ] = useLazyQuery(GET_FILTERED_COIN_LIST, {
    fetchPolicy: "no-cache",
  });

  if (filteredLoading && searchStatus !== "loading") {
    console.log(filteredLoading);
    dispatch(
      fetchSearchResult({
        status: "loading",
      })
    );
  }

  if (filteredError && searchStatus !== "error") {
    dispatch(
      fetchSearchResult({
        status: "error",
        error: filteredError.message,
      })
    );
  }

  if (filteredData && searchStatus !== "success") {
    let { filteredCoinlist } = filteredData;
    let unique_list = filteredCoinlist.filter(
      (v, i) => filteredCoinlist.indexOf(v) === i
    );
    dispatch(
      fetchSearchResult({
        data: unique_list,
        status: "success",
        error: null,
      })
    );
  }

  useEffect(() => {
    let options = {
      // accordion: false,
    };
    let elems = document.querySelectorAll(".collapsible");
    let instances = M.Collapsible.init(elems, options);
  });

  if (loading && status !== "loading") {
    dispatch(
      fetchGroups({
        status: "loading",
      })
    );
  }
  if (error && status !== "error") {
    dispatch(
      fetchGroups({
        status: "error",
        error: error.message,
      })
    );
  }
  if (data && !filterGroups) {
    dispatch(
      fetchGroups({
        ...data,
        status: "success",
      })
    );
  }

  const handleInput = (e) => {
    let filterGroup = filterGroups.filter(
      (g) => g.groupId === targetGroupId
    )[0];
    let copyOfFilterGroup = JSON.parse(JSON.stringify(filterGroup));

    if (e.target.classList.contains("group-name-input")) {
      copyOfFilterGroup["groupName"] = e.target.value;
    }

    copyOfFilterGroup.filterDetails = copyOfFilterGroup.filterDetails.map(
      (f) => {
        if (f.filterId === e.target.dataset.id) {
          if (e.target.classList.contains("arg1")) {
            f["firstArgument"] = parseFloat(e.target.value);
          } else if (e.target.classList.contains("arg2")) {
            f["secondArgument"] = parseFloat(e.target.value);
          }
        }
        return f;
      }
    );
    dispatch(updateGroup({ copyOfFilterGroup }));
  };

  const handleDeleteFilterDetail = (e) => {
    let filterGroup = filterGroups.filter(
      (g) => g.groupId === targetGroupId
    )[0];
    let copyOfFilterGroup = JSON.parse(JSON.stringify(filterGroup));

    copyOfFilterGroup.filterDetails = copyOfFilterGroup.filterDetails.filter(
      (f) => {
        return f.filterDetailId !== e.target.dataset.filterDetailId;
      }
    );

    dispatch(deleteGroupFilter({ copyOfFilterGroup }));
  };

  const handleSave = (e) => {
    let targetGroup = filterGroups.filter(
      (f) => f.groupId === targetGroupId
    )[0];
    let targetFilterDetails = targetGroup.filterDetails.map((fd) => {
      let obj = {};
      obj.filterId = fd.filterId;
      obj.firstArgument = fd.firstArgument;
      obj.secondArgument = fd.secondArgument;
      return obj;
    });
    updateFilterGroup({
      variables: {
        groupId: targetGroup.groupId,
        groupName: targetGroup.groupName,
        filterDetails: targetFilterDetails,
      },
    });
  };

  const handleClick = (e) => {
    let target = e.target.dataset.groupId;
    if (!target) target = "newGroup";
    dispatch(
      updateTarget({
        target,
      })
    );
  };

  const handleDeleteGroup = (e) => {
    console.log(e.target);
    readyToBeDeletedGroupId = e.target.dataset.groupId;
    console.log(readyToBeDeletedGroupId);
    deleteFilterGroup({
      variables: {
        id: readyToBeDeletedGroupId,
      },
    });
  };

  const handleSearch = (e) => {
    let targetGroup = filterGroups.filter(
      (f) => f.groupId === targetGroupId
    )[0];

    let targetFilterDetails = targetGroup.filterDetails.map((fd) => {
      let obj = {};
      obj.filterToApiField = fd.filterToApiField;
      obj.firstArgument = fd.firstArgument;
      obj.secondArgument = fd.secondArgument;
      return obj;
    });
    console.log("targetFilterDetails", targetFilterDetails);

    filteredCoinlist({
      variables: {
        filterDetails: targetFilterDetails,
      },
      onCompleted: (data) => {
        console.log("on completed");
        dispatch(
          updateFilterDetails({
            targetFilterDetails,
          })
        );
      },
    });
  };

  const contentToInput = (text, filterDetail, groupId) => {
    const words = text.split(" ");
    let inputCount = 0;
    // maximum 2 arguments.

    let input = words.map((word, i, self) => {
      const handleDefaultValue = (inputCount) => {
        if (inputCount === 1) {
          return filterDetail.firstArgument ? filterDetail.firstArgument : "";
        } else if (inputCount === 2) {
          return filterDetail.secondArgument ? filterDetail.secondArgument : "";
        } else {
          return "";
        }
      };

      let id =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      //Input will lose focus while changing value(Unsolved)
      if (word === "?") {
        inputCount++;
        return (
          <React.Fragment key={groupId + inputCount}>
            <div className="input-field inline">
              <ArgumentInput
                handleChange={handleInput}
                id={filterDetail.filterId}
                index={inputCount}
                defaultValue={handleDefaultValue(inputCount)}
              />
            </div>
          </React.Fragment>
        );
      } else {
        return <React.Fragment key={id}>&nbsp;{word}&nbsp;</React.Fragment>;
      }
      // if (word === "") {
      //   inputCount++;
      //   return (
      //     <React.Fragment key={id}>
      //       <div className="input-field inline">
      //         {/* <input
      //           type="number"
      //           className={"center-align arg" + inputCount}
      //           onChange={handleInput}
      //           data-id={filterDetail.filterId}
      //           defaultValue={handleDefaultValue(inputCount)}
      //         /> */}
      //         <ArgumentInput
      //           handleChange={handleInput}
      //           id={filterDetail.filterId}
      //           index={inputCount}
      //           defaultValue={handleDefaultValue(inputCount)}
      //           groupId={groupId}
      //         />
      //       </div>
      //     </React.Fragment>
      //   );
      // } else if (word !== "" && i + 1 < self.length && self[i + 1] !== "") {
      //   inputCount++;
      //   return (
      //     <React.Fragment key={id}>
      //       {word}
      //       <div className="input-field inline">
      //         <ArgumentInput
      //           handleChange={handleInput}
      //           id={filterDetail.filterId}
      //           index={inputCount}
      //           defaultValue={handleDefaultValue(inputCount)}
      //           groupId={groupId}
      //         />
      //       </div>
      //     </React.Fragment>
      //   );
      // } else {
      //   return <React.Fragment key={id}>{word}</React.Fragment>;
      // }
    });
    return <div>{input}</div>;
  };

  if (status === "loading") {
    return (
      <div className="row">
        <div className="col s6 offset-s3 center-align">
          <Loading size="big" />
        </div>
      </div>
    );
  }

  if (filterGroups) {
    let groupList = filterGroups.map((g) => {
      let i = 0;
      let filterDetails = g.filterDetails.map((f) => {
        if (f) {
          i++;
          let id =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
          return (
            <tr key={g.groupId} id={f.filterDetailId}>
              <td className="center">#{i}</td>
              <td className="center">{f.filterName}</td>
              <td className="center no-padding">
                {contentToInput(f.filterContent, f, g.groupId)}
              </td>
              <td className="center">
                <a
                  href="#!"
                  className="black-text"
                  data-filter-detail-id={f.filterDetailId}
                  onClick={handleDeleteFilterDetail}
                >
                  delete
                </a>
              </td>
            </tr>
          );
        }
      });

      return (
        <li key={g.groupId}>
          <div
            className="collapsible-header"
            onClick={handleClick}
            data-group-id={g.groupId}
          >
            {g.groupName}
          </div>
          <div className="collapsible-body center padding-1rem">
            <div className="card">
              <div className="card-content black-text no-padding-bottom">
                <form className="group-name">
                  <div className="input-field row">
                    <input
                      className="col l10 offset-l1 group-name-input group-name-input"
                      placeholder="Group Title"
                      defaultValue={g.groupName}
                      onChange={handleInput}
                      required
                    />
                    <i className="material-icons inherit-line-height col l1">
                      close
                    </i>
                  </div>
                </form>
                <table>
                  <tbody>{filterDetails}</tbody>
                </table>
                <div className="row ">
                  <div className="col s4">
                    <a href="#!" className="black-text">
                      <h5 className="center" onClick={handleSearch}>
                        search
                      </h5>
                    </a>
                  </div>
                  <div className="col s4">
                    <a href="#!" className="black-text">
                      <h5 className="center" onClick={handleSave}>
                        save
                      </h5>
                    </a>
                  </div>
                  <div className="col s4">
                    <a href="#!" className="black-text">
                      <h5
                        className="center"
                        data-group-id={g.groupId}
                        onClick={handleDeleteGroup}
                      >
                        delete
                      </h5>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      );
    });

    return (
      <ul className="collapsible">
        <li>
          <div
            className="collapsible-header display-block"
            onClick={handleClick}
          >
            <h4 className="center-align">CREATE NEW GROUP</h4>
          </div>
          <div className="collapsible-body center padding-1rem">
            <NewGroup />
          </div>
        </li>
        {groupList}
      </ul>
    );
  }

  return <h3>Something went wrong</h3>;
};
