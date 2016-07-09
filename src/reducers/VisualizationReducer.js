import VisualizationInitialState from './VisualizationInitialState';

function updateFormValue(state, value) {
  return Object.assign({}, state, {value: value});
}

function submitFormValue(state) {
  const reg = /^\d+$/;
  if(!reg.test(state.value)) {
    return state;
  }
  if (state.selection !== -1) {
    const data = state.data.slice();
    data[state.selection] = {key: data[state.selection].key, value: parseInt(state.value)};
    return Object.assign({}, state, {value: '', selection: -1, data});
  } else {
    const data = state.data.slice();
    const key = data.length > 0 ? (data[data.length - 1].key + 1) : 0;
    data.push({key: key, value: parseInt(state.value)});
    return Object.assign({}, state, {value: '', data});
  }
}

function selectDataPoint(state, selection) {
  let value = (selection !== -1) ? state.data[selection].value : state.value;
  if (state.selection !== -1 && selection === -1) {
    value = '';
  }
  return Object.assign({}, state, {selection, value});
}

function removeDataPoint(state) {
  if (state.selection === -1) {
    return state;
  }
  const data = state.data.slice();
  data.splice(state.selection, 1);
  return Object.assign({}, state, {value: '', selection: -1, data});
}

export default function(state = VisualizationInitialState, action) {
  switch (action.type) {
    case 'UPDATE_FORM_VALUE':
      return updateFormValue(state, action.value);
    case 'SUBMIT_FORM_VALUE':
      return submitFormValue(state);
    case 'SELECT_DATA_POINT':
      return selectDataPoint(state, action.index);
    case 'REMOVE_DATA_POINT':
      return removeDataPoint(state);
  }
  return state;
}
