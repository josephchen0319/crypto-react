import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css";
import { GET_FILTER_GROUPS } from "../../queries/member";
import { DELETE_FILTER_GROUP } from "../../mutations/member";
import { useHistory } from "react-router-dom";
import {
  fetchGroups,
  updateTarget,
  deleteGroup,
} from "../../features/filter_group/groupSlice";
import ArgumentInput from "./ArgumentInput";
import { NewGroup } from "./NewGroup";
import Loading from "../misc/Loading";

export const SavedGroups = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.group.status);
  const filterGroups = useSelector((state) => state.group.data);
  const targetGroupId = useSelector((state) => state.group.target);

  const { data, loading, error } = useQuery(GET_FILTER_GROUPS);
  // const [me, { data, loading, error }] = useLazyQuery(GET_FILTER_GROUPS);
  let readyToBeDeletedGroupId;
  const [
    deleteFilterGroup,
    { loading: deleteGroupLoading, error: deleteGroupError },
  ] = useMutation(DELETE_FILTER_GROUP, {
    onCompleted: (data) => {
      history.go(0);
    },
  });

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
    let copyOfFilterGroup = JSON.parse(
      JSON.stringify(filterGroup.filterDetails)
    );

    let rawFilterDetails = copyOfFilterGroup.map((f) => {
      if (f.filterId === e.target.dataset.id) {
        if (e.target.classList.contains("arg1")) {
          f["firstArgument"] = e.target.value;
        } else if (e.target.classList.contains("arg2")) {
          f["secondArgument"] = e.target.value;
        }
      }
      return f;
    });
    console.log(rawFilterDetails);

    // dispatch(
    //   updateNewGroup({
    //     filterDetails: rawFilterDetails,
    //   })
    // );
  };

  const handleClick = (e) => {
    let target = e.target.dataset.groupId;
    dispatch(
      updateTarget({
        target,
      })
    );
  };

  const handleDeleteFilterDetail = (e) => {
    console.log(e.target.dataset.filterDetailId);
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

  const contentToInput = (text, filterDetail, groupId) => {
    const words = text.split("?");
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
      if (word === "") {
        inputCount++;
        return (
          <React.Fragment key={id}>
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
                groupId={groupId}
              />
            </div>
          </React.Fragment>
        );
      } else if (word !== "" && i + 1 < self.length && self[i + 1] !== "") {
        inputCount++;
        return (
          <React.Fragment key={id}>
            {word}
            <div className="input-field inline">
              <ArgumentInput
                handleChange={handleInput}
                id={filterDetail.filterId}
                index={inputCount}
                defaultValue={handleDefaultValue(inputCount)}
                groupId={groupId}
              />
            </div>
          </React.Fragment>
        );
      } else {
        return <React.Fragment key={id}>{word}</React.Fragment>;
      }
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
            <tr key={id} id={f.filterId}>
              <td className="center">#{i}</td>
              <td className="center">{f.filterName}</td>
              <td className="center no-padding">
                {contentToInput(f.filterContent, f, g.groupId)}
              </td>
              <td className="center">
                <a
                  href="#!"
                  className="black-text"
                  id={f.filterId}
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
                      className="col l10 offset-l1 group-name-input"
                      placeholder="Group Title"
                      defaultValue={g.groupName}
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
                      <h5 className="center">search</h5>
                    </a>
                  </div>
                  <div className="col s4">
                    <a href="#!" className="black-text">
                      <h5 className="center">save</h5>
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
            data-id="newGroup"
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
