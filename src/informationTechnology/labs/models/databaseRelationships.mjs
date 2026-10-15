export function validateForeignKeys(customers, orders) {
  const ids = new Set((customers || []).map(row => Number(row.CustomerID)));
  const seen = new Set();
  const errors = [];
  for (const order of orders || []) {
    const orderId = Number(order.OrderID), customerId = Number(order.CustomerID), amount = Number(order.Amount);
    if (!Number.isInteger(orderId) || orderId <= 0) errors.push("OrderID must be a positive whole number.");
    if (seen.has(orderId)) errors.push(`Duplicate OrderID ${orderId}.`);
    seen.add(orderId);
    if (!Number.isInteger(customerId) || !ids.has(customerId)) errors.push(`Order ${orderId} refers to a missing customer.`);
    if (!Number.isFinite(amount) || amount < 0) errors.push(`Order ${orderId} has an invalid amount.`);
  }
  return { valid: errors.length === 0, errors };
}

export function addRelatedOrder(customers, orders, draft) {
  const order = { OrderID: Number(draft.OrderID), CustomerID: Number(draft.CustomerID), Amount: Number(draft.Amount) };
  const result = validateForeignKeys(customers, [...(orders || []), order]);
  return result.valid ? { orders: [...(orders || []), order], errors: [] } : { orders: orders || [], errors: result.errors };
}

export function customerOrderSummary(customers, orders) {
  return (customers || []).map(customer => {
    const related = (orders || []).filter(order => Number(order.CustomerID) === Number(customer.CustomerID));
    return { CustomerID: customer.CustomerID, Name: customer.Name, Orders: related.length, Total: related.reduce((sum, order) => sum + Number(order.Amount), 0) };
  });
}
