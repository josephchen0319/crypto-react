import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  data: [],
  target: "newGroup",
  newGroup: {
    groupName: "",
    filterDetails: [],
  },
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    fetchGroups: (state, { payload }) => {
      if (payload.status) state.status = payload.status;
      if (payload.error) state.error = payload.error;
      let groups;
      if (payload.me) {
        let {
          me: {
            savedFilterGroups: { edges },
          },
        } = payload;

        groups = edges.map((e) => {
          let group = {};
          group.groupId = e.node.id;
          group.groupName = e.node.groupName;
          group.state = e.node.state;
          group.filterDetails = e.node.filterDetails.edges.map((ed) => {
            let filterDetail = {};
            filterDetail.filterDetailId = ed.node.id;
            filterDetail.firstArgument = ed.node.firstArgument;
            filterDetail.secondArgument = ed.node.secondArgument;
            filterDetail.filterId = ed.node.filter.id;
            filterDetail.filterName = ed.node.filter.filterName;
            filterDetail.filterContent = ed.node.filter.filterContent;
            return filterDetail;
          });
          return group;
        });
      }
      state.data = groups;
    },
    addNewGroupFilter: (state, { payload }) => {
      if (payload) {
        state.newGroup.filterDetails.push(...payload.filterDetails);
      }
    },
    deleteNewGroupFilter: (state, { payload }) => {
      if (payload.filterId) {
        state.newGroup.filterDetails = state.newGroup.filterDetails.filter(
          (f) => payload.filterId !== f.filterId
        );
      }
    },
    updateNewGroup: (state, { payload }) => {
      if (payload.groupName) state.newGroup.groupName = payload.groupName;
      if (payload.filterDetails)
        state.newGroup.filterDetails = payload.filterDetails;
    },
    saveNewGroupToData: (state, { payload }) => {
      const {
        createFilterGroup: { filterGroup },
      } = payload;

      console.log("filter", filterGroup.filterDetails.edges[0].node.filter);

      const filterDetails = filterGroup.filterDetails.edges.map((e) => {
        let obj = {};
        obj.filterDetailId = e.node.id;
        obj.firstArgument = e.node.firstArgument;
        obj.secondArgument = e.node.secondArgument;
        obj.filterId = e.node.filter.id;
        obj.filterName = e.node.filter.filterName;
        obj.filterContent = e.node.filter.filterContent;
        return obj;
      });

      let newGroup = {
        groupId: filterGroup.id,
        groupName: filterGroup.groupName,
        state: filterGroup.state,
        filterDetails,
      };
      state.data.push(newGroup);
      state.newGroup = initialState.newGroup;
    },
    updateTarget: (state, { payload }) => {
      if (payload.target) state.target = payload.target;
    },
    addGroupFilter: (state, { payload }) => {
      console.log(payload);
      state.data.map((d) => {
        if (d.groupId === payload.groupId) {
          d.filterDetails.push(...payload.filterDetails);
        }
      });
    },
    deleteGroup: (state, { payload }) => {
      state.data = state.data.filter((d) => d.groupId !== payload.groupId);
    },
  },
});

export const {
  fetchGroups,
  addNewGroupFilter,
  deleteNewGroupFilter,
  updateNewGroup,
  saveNewGroupToData,
  updateTarget,
  addGroupFilter,
  deleteGroup,
} = groupSlice.actions;

export default groupSlice.reducer;
