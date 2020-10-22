import React from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNewGroupFilter,
  updateNewGroup,
  saveNewGroupToData,
  updateTarget,
} from "../../features/filter_group/groupSlice";
import { CREATE_GROUP } from "../../mutations/member";
import ArgumentInput from "./ArgumentInput";
import M from "materialize-css";
import { GET_FILTERED_COIN_LIST } from "../../queries/filter";
import { fetchSearchResult } from "../../features/market/searchResultSlice";
import { updateFilterDetails } from "../../features/market/searchResultSlice";

export const NewGroup = () => {
  const dispatch = useDispatch();
  const newGroup = useSelector((state) => state.group.newGroup);
  const searchStatus = useSelector((state) => state.searchResult.status);

  const handleDelete = (e) => {
    dispatch(
      deleteNewGroupFilter({
        filterId: e.target.id,
      })
    );
  };

  let { groupName, filterDetails } = newGroup;

  const handleGroupTitleInput = (e) => {
    dispatch(
      updateNewGroup({
        ...newGroup,
        groupName: e.target.value,
      })
    );
  };

  let copyOfNewGroup = JSON.parse(JSON.stringify(filterDetails));

  const handleInput = (e) => {
    let rawFilterDetails = copyOfNewGroup.map((f) => {
      if (f.filterId === e.target.dataset.id) {
        if (e.target.classList.contains("arg1")) {
          f["firstArgument"] = e.target.value;
        } else if (e.target.classList.contains("arg2")) {
          f["secondArgument"] = e.target.value;
        }
      }
      return f;
    });
    dispatch(
      updateNewGroup({
        ...newGroup,
        filterDetails: rawFilterDetails,
      })
    );
  };

  const filterDetailsForMutation = newGroup.filterDetails.map((d) => {
    let fd = {};
    fd.filterId = d.filterId;
    fd.firstArgument = d.firstArgument ? parseInt(d.firstArgument) : null;
    fd.secondArgument = d.secondArgument ? parseInt(d.secondArgument) : null;
    return fd;
  });

  const [
    createFilterGroup,
    { loading: createGroupLoading, error: createGroupError },
  ] = useMutation(CREATE_GROUP, {
    variables: {
      groupName,
      filterDetails: filterDetailsForMutation,
    },
    onCompleted: (data) => {
      dispatch(saveNewGroupToData(data));
    },
  });

  const [
    filteredCoinlist,
    { data: filteredData, loading: filteredLoading, error: filteredError },
  ] = useLazyQuery(GET_FILTERED_COIN_LIST);

  if (filteredLoading && searchStatus !== "loading") {
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

  const handleToast = () => {
    M.toast({
      html: "Choose your preferred filter on the left to complete the action",
      displayLength: 2000,
    });
  };

  const handleSave = (e) => {
    if (filterDetailsForMutation.length !== 0) {
      createFilterGroup();
    } else {
      handleToast();
    }
  };

  const handleSearch = (e) => {
    let targetFilterDetails = newGroup.filterDetails.map((fd) => {
      let obj = {};
      obj.filterToApiField = fd.filterToApiField;
      obj.firstArgument = fd.firstArgument;
      obj.secondArgument = fd.secondArgument;
      return obj;
    });
    filteredCoinlist({
      variables: {
        filterDetails: targetFilterDetails,
      },
    });
    dispatch(
      updateFilterDetails({
        targetFilterDetails,
      })
    );
  };

  const contentToInput = (text, filterDetail) => {
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
          <React.Fragment key={"newGroup" + inputCount}>
            <div className="input-field inline">
              {/* <input
                type="number"
                className={"center-align arg" + inputCount}
                onChange={handleInput}
                data-id={filterDetail.filterId}
                defaultValue={handleDefaultValue(inputCount)}
              /> */}
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
    });
    return <div>{input}</div>;
  };

  // const contentToInput = (text, filterDetail) => {
  //   const words = text.split("?");
  //   let inputCount = 0;
  //   // maximum 2 arguments.

  //   let input = words.map((word, i, self) => {
  //     const handleDefaultValue = (inputCount) => {
  //       if (inputCount === 1) {
  //         return filterDetail.firstArgument ? filterDetail.firstArgument : "";
  //       } else if (inputCount === 2) {
  //         return filterDetail.secondArgument ? filterDetail.secondArgument : "";
  //       } else {
  //         return "";
  //       }
  //     };

  //     let id =
  //       Math.random().toString(36).substring(2, 15) +
  //       Math.random().toString(36).substring(2, 15);

  //     //Input will lose focus while changing value(Unsolved)
  //     if (word === "") {
  //       inputCount++;
  //       return (
  //         <React.Fragment key={id}>
  //           <div className="input-field inline">
  //             {/* <input
  //               type="number"
  //               className={"center-align arg" + inputCount}
  //               onChange={handleInput}
  //               data-id={filterDetail.filterId}
  //               defaultValue={handleDefaultValue(inputCount)}
  //             /> */}
  //             <ArgumentInput
  //               handleChange={handleInput}
  //               id={filterDetail.filterId}
  //               index={inputCount}
  //               defaultValue={handleDefaultValue(inputCount)}
  //             />
  //           </div>
  //         </React.Fragment>
  //       );
  //     } else if (word !== "" && i + 1 < self.length && self[i + 1] !== "") {
  //       inputCount++;
  //       return (
  //         <React.Fragment key={id}>
  //           {word}
  //           <div className="input-field inline">
  //             <ArgumentInput
  //               handleChange={handleInput}
  //               id={filterDetail.filterId}
  //               index={inputCount}
  //               defaultValue={handleDefaultValue(inputCount)}
  //             />
  //           </div>
  //         </React.Fragment>
  //       );
  //     } else {
  //       return <React.Fragment key={id}>{word}</React.Fragment>;
  //     }
  //   });
  //   return <div>{input}</div>;
  // };

  let i = 0;
  let groupList = newGroup.filterDetails.map((f) => {
    i++;
    return (
      <tr key={f.filterId} id={f.filterId}>
        <td className="center">#{i}</td>
        <td className="center">{f.filterName}</td>
        <td className="center no-padding">
          {contentToInput(f.filterContent, f)}
        </td>
        <td className="center">
          <a
            href="#!"
            className="black-text"
            id={f.filterId}
            onClick={handleDelete}
          >
            delete
          </a>
        </td>
      </tr>
    );
  });

  return (
    <div className="card">
      <div className="card-content black-text no-padding-bottom">
        <form className="group-name">
          <div className="input-field row">
            <input
              className="col l10 offset-l1 group-name-input"
              placeholder="Group Title"
              onChange={handleGroupTitleInput}
              defaultValue={groupName}
              required
            />
            <i className="material-icons inherit-line-height col l1">close</i>
          </div>
        </form>
        <table>
          <tbody>{groupList}</tbody>
        </table>
        <div className="row ">
          <div className="col s6">
            <a href="#!" className="black-text">
              <h5 className="center" onClick={handleSearch}>
                search
              </h5>
            </a>
          </div>
          <div className="col s6">
            <a href="#!" className="black-text" onClick={handleSave}>
              <h5 className="center">save</h5>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
