const { format, parseISO } = require('date-fns');

const formatDate = (date) => format(parseISO(date), 'dd/MM/yyyy');

const formatTime = (time) => format(parseISO(time), 'HH:mm');

const formatCurrency = (value) => {
  const num =
    isNaN(value) || value === '' || value === null ? 0.0 : value / 100;

  return parseFloat(num)
    .toFixed(2)
    .replace('.', ',')
    .toString()
    .replace(/( \d )( ?=( \d\d\d )+( ?!\d ) )/g, '$1.');
};

const math = (lvalue, operator, rvalue) => {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);

  return {
    '+': lvalue + rvalue,
    '-': lvalue - rvalue,
    '*': lvalue * rvalue,
    '/': lvalue / rvalue,
    '%': lvalue % rvalue,
  }[operator];
};

const group = (list, options) => {
  options = options || {};

  let fn = options.fn || noop,
    inverse = options.inverse || noop,
    hash = options.hash,
    prop = hash && hash.by,
    keys = [],
    groups = {},
    groupIndex = -1;

  if (!prop || !list || !list.length) return inverse(this);

  function groupKey(item) {
    const key = get(item, prop);

    if (keys.indexOf(key) === -1) {
      keys.push(key);
      groupIndex++;
    }

    if (!groups[key]) {
      groups[key] = {
        index: groupIndex,
        value: key,
        items: [],
      };
    }

    groups[key].items.push(item);
  }

  function renderGroup(buffer, key) {
    return buffer + fn(groups[key]);
  }

  function get(obj, prop) {
    let parts = prop.split('.'),
      last = parts.pop();

    while ((prop = parts.shift())) {
      obj = obj[prop];

      if (obj == null) {
        return;
      }
    }

    return obj[last];
  }

  function noop() {
    return '';
  }

  list.forEach(groupKey);

  return keys.reduce(renderGroup, '');
};

const richShippingData = (context, options) => {
  let items = context.logisticsInfo;

  for (let i = 0, j = items.length; i < j; i++) {
    const item = items[i];

    for (let ii = 0, jj = item.slas.length; ii < jj; ii++) {
      const sla = item.slas[ii];

      if (item.selectedSla === sla.id) {
        let d = sla.shippingEstimate;
        let dType = null;
        if (/^(\d)+(?=m)/g.test(d)) {
          d = d.substring(0, d.length - 1);
          dType = 'm';
        } else if (/^(\d)+(?=h)/g.test(d)) {
          d = d.substring(0, d.length - 1);
          dType = 'h';
        } else if (/^(\d)+(?=d)/g.test(d)) {
          d = d.substring(0, d.length - 1);
          dType = 'd';
        } else if (/^(\d)+(?=bd)/g.test(d)) {
          d = d.substring(0, d.length - 2);
          dType = 'bd';
        }
        item.packageId =
          sla.id + sla.shippingEstimateDate + sla.shippingEstimate;
        item.shippingEstimateDays = d;
        item.shippingEstimateDaysType = dType;
        item.shippingEstimate = sla.shippingEstimate;
        item.shippingEstimateDate = sla.shippingEstimateDate;
        item.deliveryWindow = sla.deliveryWindow;
        item.availableDeliveryWindows = sla.availableDeliveryWindows;
      }
    }
  }

  items.sort((a, b) => a.shippingEstimateDays - b.shippingEstimateDays);

  return options.fn(context);
};

module.exports = {
  formatDate,
  formatTime,
  formatCurrency,
  math,
  group,
  richShippingData,
};
