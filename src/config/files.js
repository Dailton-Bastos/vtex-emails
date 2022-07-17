const access_key = require('../data/vtex/01-access-key.json');
const newsletter = require('../data/vtex/02-newsletter.json');
const contact_client = require('../data/vtex/03-contact-client.json');
const contact_store = require('../data/vtex/04-contact-store.json');
const let_me_know = require('../data/vtex/05-let-me-know.json');
const payment_pending = require('../data/vtex/06-payment-pending.json');
const order_confirmation = require('../data/vtex/07-order-confirmation.json');
const payment_approved = require('../data/vtex/08-payment-approved.json');
const order_invoiced = require('../data/vtex/09-order-invoiced.json');
const order_shipped = require('../data/vtex/010-order-shipped.json');
const order_delivered = require('../data/vtex/011-order-delivered.json');
const order_cancelled = require('../data/vtex/012-order-cancelled.json');
const cancel_billed_request = require('../data/vtex/013-cancel-billed-request.json');
const cancel_shipped_order = require('../data/vtex/014-cancel-shipped-order.json');
const payment_denied = require('../data/vtex/015-payment-denied.json');
const order_replace = require('../data/vtex/016-order-replace.json');
const order_refunded = require('../data/vtex/017-order-refunded.json');
const order_changed = require('../data/vtex/018-order-changed.json');

module.exports = [
  access_key,
  newsletter,
  contact_client,
  contact_store,
  let_me_know,
  payment_pending,
  order_confirmation,
  payment_approved,
  order_invoiced,
  order_shipped,
  order_delivered,
  order_cancelled,
  cancel_billed_request,
  cancel_shipped_order,
  payment_denied,
  order_replace,
  order_refunded,
  order_changed,
];
