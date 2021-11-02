export const state = () => ({
  showAdd: false,
});

export const mutations = {
  toggle(state) {
    state.showAdd = !state.showAdd;
  },
};
