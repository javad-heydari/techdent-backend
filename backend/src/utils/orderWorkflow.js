const ORDER_FLOW = {
  pending: ["in_progress"],
  in_progress: ["qc"],
  qc: ["ready"],
  ready: ["delivered"],
  delivered: [],
};

/**
 * بررسی اجازه تغییر status
 */
const canChangeStatus = (current, next, role) => {
  // 👑 admin می‌تواند همه چیز را override کند
  if (role === "admin") return true;

  // 👤 user فقط پیشرفت مرحله‌ای
  const allowed = ORDER_FLOW[current] || [];
  return allowed.includes(next);
};

module.exports = {
  ORDER_FLOW,
  canChangeStatus,
};