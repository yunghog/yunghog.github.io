export const fadeUp = (duration = 1000, timing = 'ease', delay = 0) => {
  const style = {
    animation: 'fadeUpAnimy ' + duration + 'ms ' + timing + ' ' + delay + 'ms ',
  };
  return style;
};
export const fadeRight = (duration = 1000, timing = 'ease', delay = 0) => {
  const style = {
    animation: 'fadeRightAnim ' + duration + 'ms ' + timing + ' ' + delay + 'ms ',
  };
  return style;
};
