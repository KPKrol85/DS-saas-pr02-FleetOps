const Roles = {
  ADMIN: "admin",
  DISPATCHER: "dispatcher",
  DRIVER: "driver",
};

const Actions = {
  ORDERS_CREATE: "orders:create",
  ORDERS_EDIT: "orders:edit",
  ORDERS_DELETE: "orders:delete",
  FLEET_CREATE: "fleet:create",
  FLEET_EDIT: "fleet:edit",
  FLEET_DELETE: "fleet:delete",
  DRIVERS_CREATE: "drivers:create",
  DRIVERS_EDIT: "drivers:edit",
  DRIVERS_DELETE: "drivers:delete",
};

const roleLabels = {
  [Roles.ADMIN]: "Administrator",
  [Roles.DISPATCHER]: "Dyspozytor",
  [Roles.DRIVER]: "Kierowca",
};

const getRoleLabel = (role) => roleLabels[role] || role || "Użytkownik";

const actionLabels = {
  [Actions.ORDERS_CREATE]: "tworzenie zleceń",
  [Actions.ORDERS_EDIT]: "edycja zleceń",
  [Actions.ORDERS_DELETE]: "usuwanie zleceń",
  [Actions.FLEET_CREATE]: "dodawanie pojazdów",
  [Actions.FLEET_EDIT]: "edycja pojazdów",
  [Actions.FLEET_DELETE]: "usuwanie pojazdów",
  [Actions.DRIVERS_CREATE]: "dodawanie kierowców",
  [Actions.DRIVERS_EDIT]: "edycja kierowców",
  [Actions.DRIVERS_DELETE]: "usuwanie kierowców",
};

const DemoUsers = [
  { id: "u_admin_1", role: Roles.ADMIN, displayName: "Administrator demo" },
  { id: "u_disp_1", role: Roles.DISPATCHER, displayName: "Dyspozytor demo" },
  { id: "u_drv_1", role: Roles.DRIVER, displayName: "Kierowca demo" },
];

const defaultUser = DemoUsers[0];

const resolveUser = (context = {}) =>
  context.user ||
  (window.FleetStore && FleetStore.state && FleetStore.state.currentUser) ||
  defaultUser;

const isOwner = (record, user) => record && user && record.createdBy && record.createdBy === user.id;

const can = (action, context = {}) => {
  const user = resolveUser(context);
  if (!user || !action) return false;

  if (user.role === Roles.ADMIN) return true;

  if (user.role === Roles.DRIVER) {
    return false;
  }

  if (user.role === Roles.DISPATCHER) {
    if (action.endsWith(":create")) return true;
    if (action.endsWith(":delete")) return false;
    if (action.endsWith(":edit")) return isOwner(context.record, user);
  }

  return false;
};

const explainDeny = (action, context = {}) => {
  const user = resolveUser(context);
  const role = getRoleLabel(user && user.role);
  const actionLabel = actionLabels[action] || "akcja";

  if (user && user.role === Roles.DRIVER) {
    return `${role} ma tylko podgląd - ${actionLabel} zablokowane.`;
  }

  if (user && user.role === Roles.DISPATCHER && action && action.endsWith(":edit")) {
    return `Tylko własne rekordy - ${actionLabel} niedozwolone.`;
  }

  return `${role} nie ma uprawnień na ${actionLabel}.`;
};

const applyDisabledState = (el, allowed, message) => {
  if (!el) return;
  el.setAttribute("aria-disabled", allowed ? "false" : "true");
  const isDropdownItem = el.classList.contains("dropdown-item");
  if ("disabled" in el && !isDropdownItem) {
    el.disabled = !allowed;
  }
  if (!allowed) {
    if (message) el.setAttribute("title", message);
    el.classList.add("is-disabled");
  } else {
    el.removeAttribute("title");
    el.classList.remove("is-disabled");
  }
};

const guard = (action, context = {}) => {
  if (can(action, context)) return true;
  const message = explainDeny(action, context);
  if (window.Toast && typeof Toast.show === "function") {
    Toast.show(`Brak uprawnień: ${message}`, "warning", { assertive: true });
  }
  if (window.FleetStore && typeof FleetStore.addActivity === "function") {
    FleetStore.addActivity({
      title: "Odmowa uprawnień",
      detail: message,
      time: new Date().toISOString(),
    });
  }
  return false;
};

window.FleetPermissions = {
  Roles,
  Actions,
  roleLabels,
  getRoleLabel,
  DemoUsers,
  defaultUser,
  can,
  explainDeny,
  applyDisabledState,
  guard,
};
