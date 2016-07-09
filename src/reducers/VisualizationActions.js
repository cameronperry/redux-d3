export function onChange(value) {
  return {
    type: 'UPDATE_FORM_VALUE',
    value: value
  };
}

export function onSubmit(value) {
  return {
    type: 'SUBMIT_FORM_VALUE',
    value: value
  };
}

export function onRemove(index) {
  return {
    type: 'REMOVE_DATA_POINT',
    index: index
  };
}

export function onSelect(index) {
  return {
    type: 'SELECT_DATA_POINT',
    index: index
  };
}
