"use strict";

/*
 * Données du planning.
 * Chaque présence indique le professionnel, le jour, la période, la salle,
 * le type d’occupation et ses heures approximatives de début et de fin.
 */
const PLANNING_DATA = {
  days: [
    { id: "lundi", label: "Lundi" },
    { id: "mardi", label: "Mardi" },
    { id: "mercredi", label: "Mercredi" },
    { id: "jeudi", label: "Jeudi" },
    { id: "vendredi", label: "Vendredi" },
  ],

  periods: [
    { id: "matin", label: "Matin", start: "08:00", end: "12:00" },
    { id: "apres-midi", label: "Après-midi", start: "13:00", end: "19:00" },
  ],

  rooms: [1, 2, 3, 4, 5],

  // Accès à l’espace gym pour le nouveau kiné, indépendant des salles choisies.
  gymAccess: {
    lundi: ["matin"],
    mercredi: ["matin", "apres-midi"],
    vendredi: ["matin", "apres-midi"],
  },

  // Scénario de départ validé le 17 novembre 2026. Les essais enregistrés
  // dans le navigateur restent prioritaires sur ces valeurs par défaut.
  defaultOffsitePreferences: {
    "lundi|apres-midi": "home",
    "mardi|matin": "rest",
    "mardi|apres-midi": "home",
    "jeudi|apres-midi": "home",
  },

  professionals: [
    { id: "damien", name: "Damien", color: "#a8cdea", ink: "#172936", active: true },
    { id: "johan", name: "Johan", color: "#b7dba8", ink: "#172936", active: true },
    { id: "justine", name: "Justine", color: "#b6a0db", ink: "#172936", active: true },
    { id: "marine", name: "Marine", color: "#c47f90", ink: "#172936", active: true },
    { id: "simon", name: "Simon", color: "#2f5b88", ink: "#ffffff", active: true },
    { id: "florianne", name: "Florianne", color: "#68c7c1", ink: "#172936", active: true },
    { id: "nouveau", name: "Nouveau kiné", color: "#f2bd79", ink: "#172936", active: true },
  ],

  occupations: [
    // Damien
    { professionalId: "damien", day: "mercredi", period: "matin", room: 1, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "damien", day: "jeudi", period: "apres-midi", room: 1, typeOccupation: "complete", start: "13:00", end: "19:00" },

    // Johan
    { professionalId: "johan", day: "lundi", period: "matin", room: 5, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "johan", day: "mardi", period: "matin", room: 5, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "johan", day: "mercredi", period: "matin", room: 5, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "johan", day: "jeudi", period: "matin", room: 5, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "johan", day: "vendredi", period: "matin", room: 5, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "johan", day: "lundi", period: "apres-midi", room: 5, typeOccupation: "complete", start: "13:00", end: "19:00" },
    { professionalId: "johan", day: "mercredi", period: "apres-midi", room: 5, typeOccupation: "complete", start: "13:00", end: "19:00" },
    { professionalId: "johan", day: "jeudi", period: "apres-midi", room: 5, typeOccupation: "complete", start: "13:00", end: "19:00" },

    // Justine
    { professionalId: "justine", day: "mardi", period: "matin", room: 3, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "justine", day: "jeudi", period: "matin", room: 3, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "justine", day: "lundi", period: "apres-midi", room: 3, typeOccupation: "complete", start: "13:00", end: "19:00" },
    { professionalId: "justine", day: "mardi", period: "apres-midi", room: 3, typeOccupation: "complete", start: "13:00", end: "19:00" },
    { professionalId: "justine", day: "jeudi", period: "apres-midi", room: 3, typeOccupation: "complete", start: "13:00", end: "19:00" },
    { professionalId: "justine", day: "vendredi", period: "apres-midi", room: 3, typeOccupation: "partielle", start: "13:00", end: "16:00", comment: "Justine · salle 3 · vendredi de 13 h à 16 h" },

    // Marine
    { professionalId: "marine", day: "lundi", period: "matin", room: 1, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "marine", day: "lundi", period: "apres-midi", room: 1, typeOccupation: "complete", start: "13:00", end: "19:00" },
    { professionalId: "marine", day: "mardi", period: "apres-midi", room: 1, typeOccupation: "complete", start: "13:00", end: "19:00" },
    { professionalId: "marine", day: "mercredi", period: "matin", room: 4, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "marine", day: "jeudi", period: "apres-midi", room: 4, typeOccupation: "complete", start: "13:00", end: "19:00" },
    { professionalId: "marine", day: "vendredi", period: "matin", room: 1, typeOccupation: "complete", start: "08:00", end: "12:00" },

    // Simon
    { professionalId: "simon", day: "lundi", period: "matin", room: 4, typeOccupation: "partielle", start: "11:00", end: "12:00", comment: "Simon · salle 4 · lundi de 11 h à 12 h" },
    { professionalId: "simon", day: "lundi", period: "apres-midi", room: 4, typeOccupation: "complete", start: "13:00", end: "19:00" },
    { professionalId: "simon", day: "mardi", period: "matin", room: 4, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "simon", day: "mardi", period: "apres-midi", room: 4, typeOccupation: "complete", start: "13:00", end: "19:00" },
    { professionalId: "simon", day: "mercredi", period: "apres-midi", room: 4, typeOccupation: "complete", start: "13:00", end: "19:00" },
    { professionalId: "simon", day: "jeudi", period: "matin", room: 4, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "simon", day: "vendredi", period: "apres-midi", room: 4, typeOccupation: "complete", start: "13:00", end: "19:00" },

    // Florianne — occupations complètes
    { professionalId: "florianne", day: "lundi", period: "apres-midi", room: 2, typeOccupation: "complete", start: "13:00", end: "19:00" },
    { professionalId: "florianne", day: "mardi", period: "matin", room: 2, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "florianne", day: "mardi", period: "apres-midi", room: 2, typeOccupation: "complete", start: "13:00", end: "19:00" },
    { professionalId: "florianne", day: "jeudi", period: "matin", room: 2, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "florianne", day: "jeudi", period: "apres-midi", room: 2, typeOccupation: "complete", start: "13:00", end: "19:00" },

    // Florianne — occupations partielles
    { professionalId: "florianne", day: "lundi", period: "matin", room: 2, typeOccupation: "partielle", start: "11:30", end: "12:00", comment: "Florianne · salle 2 · lundi de 11 h 30 à 12 h" },
    { professionalId: "florianne", day: "mercredi", period: "matin", room: 2, typeOccupation: "partielle", start: "11:30", end: "12:00", comment: "Florianne · salle 2 · mercredi de 11 h 30 à 12 h" },
    { professionalId: "florianne", day: "mercredi", period: "apres-midi", room: 2, typeOccupation: "partielle", start: "13:00", end: "15:00", approximate: true, comment: "Florianne · salle 2 · mercredi en début d’après-midi (horaire approximatif)" },

    // Nouveau kiné — scénario de départ partagé
    { professionalId: "nouveau", day: "lundi", period: "matin", room: 3, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "nouveau", day: "mardi", period: "matin", room: 1, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "nouveau", day: "mercredi", period: "matin", room: 3, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "nouveau", day: "mercredi", period: "apres-midi", room: 3, typeOccupation: "complete", start: "13:00", end: "19:00" },
    { professionalId: "nouveau", day: "jeudi", period: "matin", room: 1, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "nouveau", day: "vendredi", period: "matin", room: 3, typeOccupation: "complete", start: "08:00", end: "12:00" },
    { professionalId: "nouveau", day: "vendredi", period: "apres-midi", room: 1, typeOccupation: "complete", start: "13:00", end: "19:00" },
  ],
};

const professionalById = new Map(
  PLANNING_DATA.professionals.map((professional) => [professional.id, professional]),
);
const dayById = new Map(PLANNING_DATA.days.map((day) => [day.id, day]));
const periodById = new Map(PLANNING_DATA.periods.map((period) => [period.id, period]));
let selectedProfessionalId = null;
let assignments = new Map();
let offsitePreferences = { ...PLANNING_DATA.defaultOffsitePreferences };
const hourCellByKey = new Map();
const summaryCellByKey = new Map();
const STORAGE_KEY = "scm-kine:planning-salles:v1";
const OFFSITE_OPTIONS = [
  { value: "undecided", label: "Domiciles ou repos" },
  { value: "home", label: "Domiciles" },
  { value: "rest", label: "Repos" },
];

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatTime(time) {
  const [hours, minutes] = time.split(":");
  return minutes === "00" ? `${Number(hours)} h` : `${Number(hours)} h ${minutes}`;
}

function occupationDescription(occupation) {
  if (occupation.comment) return occupation.comment;
  const professional = professionalById.get(occupation.professionalId);
  const day = dayById.get(occupation.day).label.toLowerCase();
  return `${professional.name} · salle ${occupation.room} · ${day} de ${formatTime(occupation.start)} à ${formatTime(occupation.end)}`;
}

function activeOccupations() {
  return PLANNING_DATA.occupations.filter(
    (occupation) => professionalById.get(occupation.professionalId)?.active,
  );
}

function slotKey(day, room, hour) {
  return `${day}|${room}|${hour}`;
}

function periodHours(period) {
  const firstHour = timeToMinutes(period.start) / 60;
  const lastHour = timeToMinutes(period.end) / 60;
  return Array.from({ length: lastHour - firstHour }, (_, index) => firstHour + index);
}

function buildInitialAssignments() {
  const initialAssignments = new Map();

  activeOccupations().forEach((occupation) => {
    const period = periodById.get(occupation.period);
    const occupationStart = timeToMinutes(occupation.start);
    const occupationEnd = timeToMinutes(occupation.end);

    periodHours(period).forEach((hour) => {
      const hourStart = hour * 60;
      const hourEnd = (hour + 1) * 60;
      if (occupationStart >= hourEnd || occupationEnd <= hourStart) return;

      const key = slotKey(occupation.day, occupation.room, hour);
      const occupants = initialAssignments.get(key) ?? new Set();
      occupants.add(occupation.professionalId);
      initialAssignments.set(key, occupants);
    });
  });

  return initialAssignments;
}

function halfDayKey(day, period) {
  return `${day}|${period}`;
}

// Le second tableau est toujours dérivé des cases horaires : aucune copie
// indépendante des affectations de salle n’est enregistrée.
function summarizeNewProfessional(currentAssignments, preferences = {}) {
  return PLANNING_DATA.periods.flatMap((period) =>
    PLANNING_DATA.days.map((day) => {
      const hours = periodHours(period);
      const rooms = PLANNING_DATA.rooms.filter((room) =>
        hours.some((hour) => currentAssignments.get(slotKey(day.id, room, hour))?.has("nouveau")),
      );
      const conflict = rooms.some((room) =>
        hours.some((hour) => {
          const occupants = currentAssignments.get(slotKey(day.id, room, hour));
          return occupants?.has("nouveau") && occupants.size > 1;
        }),
      );
      const key = halfDayKey(day.id, period.id);
      const offsite = OFFSITE_OPTIONS.find((option) => option.value === preferences[key])
        ?? OFFSITE_OPTIONS[0];
      const roomLabel = rooms.length > 1
        ? `Salles ${rooms.slice(0, -1).join(", ")} et ${rooms.at(-1)}`
        : rooms.length ? `Salle ${rooms[0]}` : "";
      const gym = rooms.length > 0 && (PLANNING_DATA.gymAccess[day.id] ?? []).includes(period.id);
      return {
        key, day: day.id, period: period.id, rooms, roomLabel, gym, conflict,
        offsite: offsite.value,
        label: rooms.length ? `${roomLabel}${gym ? " + espace gym" : ""}` : offsite.label,
      };
    }),
  );
}

function decodeSavedPlanning(raw) {
  const saved = JSON.parse(raw);
  if (!saved || saved.version !== 1 || !Array.isArray(saved.assignments)) {
    throw new Error("Format de sauvegarde inconnu.");
  }
  const restored = new Map();
  saved.assignments.forEach((entry) => {
    if (!Array.isArray(entry) || entry.length !== 2) throw new Error("Case invalide.");
    const [key, ids] = entry;
    if (typeof key !== "string" || !Array.isArray(ids)) throw new Error("Case invalide.");
    const [day, room, hour] = key.split("|");
    const validHour = PLANNING_DATA.periods.some((period) => periodHours(period).includes(Number(hour)));
    if (!dayById.has(day) || !PLANNING_DATA.rooms.includes(Number(room)) || !validHour
      || key !== slotKey(day, Number(room), Number(hour))
      || ids.some((id) => !professionalById.get(id)?.active)) {
      throw new Error("Case inconnue.");
    }
    if (ids.length) restored.set(key, new Set(ids));
  });
  const preferences = {};
  for (const day of PLANNING_DATA.days) {
    for (const period of PLANNING_DATA.periods) {
      const key = halfDayKey(day.id, period.id);
      const choice = saved.offsitePreferences?.[key];
      if (OFFSITE_OPTIONS.some((option) => option.value === choice)) preferences[key] = choice;
    }
  }
  return { assignments: restored, offsitePreferences: preferences };
}

function storageWarning(message) {
  const warning = document.querySelector("#storageWarning");
  warning.textContent = message;
  warning.hidden = !message;
}

function restorePlanning() {
  let raw;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    storageWarning("La mémorisation est indisponible dans ce navigateur. Les essais restent possibles, mais ne seront pas conservés après fermeture.");
    return;
  }
  if (raw === null) return;
  try {
    const restored = decodeSavedPlanning(raw);
    assignments = restored.assignments;
    offsitePreferences = restored.offsitePreferences;
  } catch {
    storageWarning("La sauvegarde locale n’a pas pu être relue. Le planning de départ est affiché.");
  }
}

function savePlanning() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: 1,
      assignments: [...assignments].map(([key, occupants]) => [key, [...occupants]]),
      offsitePreferences,
    }));
    storageWarning("");
  } catch {
    storageWarning("Les derniers changements ne peuvent pas être mémorisés. Vous pouvez continuer vos essais et les imprimer en PDF.");
  }
}

function buildNewPlanning() {
  const table = document.querySelector("#newPlanningTable");
  const head = table.createTHead();
  const header = head.insertRow();
  const corner = document.createElement("th");
  corner.scope = "col";
  const cornerLabel = document.createElement("span");
  cornerLabel.className = "visually-hidden";
  cornerLabel.textContent = "Demi-journée";
  corner.append(cornerLabel);
  header.append(corner);
  for (const day of PLANNING_DATA.days) {
    const cell = document.createElement("th");
    cell.scope = "col";
    cell.textContent = day.label;
    header.append(cell);
  }
  const body = table.createTBody();
  for (const period of PLANNING_DATA.periods) {
    const row = body.insertRow();
    const label = document.createElement("th");
    label.scope = "row";
    label.textContent = period.label;
    row.append(label);
    for (const day of PLANNING_DATA.days) {
      const key = halfDayKey(day.id, period.id);
      const cell = row.insertCell();
      cell.dataset.halfDay = key;
      const text = document.createElement("span");
      text.className = "summary-label";
      const gym = document.createElement("span");
      gym.className = "summary-gym";
      gym.textContent = "(+ espace gym)";
      const select = document.createElement("select");
      select.className = "offsite-select";
      select.setAttribute("aria-label", `${day.label}, ${period.label.toLowerCase()} : activité hors cabinet`);
      for (const option of OFFSITE_OPTIONS) {
        const item = document.createElement("option");
        item.value = option.value;
        item.textContent = option.label;
        select.append(item);
      }
      select.addEventListener("change", () => {
        offsitePreferences[key] = select.value;
        renderNewPlanning();
        savePlanning();
      });
      const conflict = document.createElement("span");
      conflict.className = "summary-conflict";
      conflict.textContent = "Conflit de salle";
      cell.append(text, gym, select, conflict);
      summaryCellByKey.set(key, { cell, text, gym, select, conflict });
    }
  }
  renderNewPlanning();
}

function renderNewPlanning() {
  for (const item of summarizeNewProfessional(assignments, offsitePreferences)) {
    const { cell, text, gym, select, conflict } = summaryCellByKey.get(item.key);
    const atCabinet = item.rooms.length > 0;
    cell.classList.toggle("at-cabinet", atCabinet);
    cell.classList.toggle("is-rest", !atCabinet && item.offsite === "rest");
    cell.classList.toggle("is-home", !atCabinet && item.offsite === "home");
    cell.classList.toggle("has-conflict", item.conflict);
    text.textContent = atCabinet ? item.roomLabel : item.label;
    gym.hidden = !item.gym;
    select.hidden = atCabinet;
    select.value = item.offsite;
    conflict.hidden = !item.conflict;
  }
}

function printPlanning(target) {
  document.body.dataset.printTarget = target;
  const originalTitle = document.title;
  document.title = target === "new" ? "Planning du nouveau kiné" : "Planning des salles";
  const cleanup = () => {
    delete document.body.dataset.printTarget;
    document.title = originalTitle;
  };
  window.addEventListener("afterprint", cleanup, { once: true });
  // Laisse le navigateur appliquer la mise en page avant l’aperçu d’impression.
  window.requestAnimationFrame(() => {
    try { window.print(); }
    catch (error) {
      cleanup();
      throw error;
    }
  });
}

function validateData() {
  const errors = [];
  const blockingConflicts = [];
  const advisoryOverlaps = [];
  const occupations = activeOccupations();

  PLANNING_DATA.occupations.forEach((occupation, index) => {
    const period = periodById.get(occupation.period);
    const start = timeToMinutes(occupation.start);
    const end = timeToMinutes(occupation.end);

    if (!professionalById.has(occupation.professionalId)) errors.push(`Professionnel inconnu à la ligne ${index + 1}.`);
    if (!dayById.has(occupation.day)) errors.push(`Jour inconnu à la ligne ${index + 1}.`);
    if (!period) errors.push(`Période inconnue à la ligne ${index + 1}.`);
    if (!PLANNING_DATA.rooms.includes(occupation.room)) errors.push(`Salle inconnue à la ligne ${index + 1}.`);
    if (!Number.isFinite(start) || !Number.isFinite(end) || start >= end) errors.push(`Horaire invalide à la ligne ${index + 1}.`);
    if (period && (start < timeToMinutes(period.start) || end > timeToMinutes(period.end))) {
      errors.push(`Horaire hors de la période à la ligne ${index + 1}.`);
    }
  });

  for (let firstIndex = 0; firstIndex < occupations.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < occupations.length; secondIndex += 1) {
      const first = occupations[firstIndex];
      const second = occupations[secondIndex];
      const samePlace = first.day === second.day && first.room === second.room;
      const overlaps =
        timeToMinutes(first.start) < timeToMinutes(second.end) &&
        timeToMinutes(second.start) < timeToMinutes(first.end);

      if (!samePlace || !overlaps) continue;

      const record = { first, second };
      if (first.typeOccupation === "complete" && second.typeOccupation === "complete") {
        blockingConflicts.push(record);
      } else {
        advisoryOverlaps.push(record);
      }
    }
  }

  return { errors, blockingConflicts, advisoryOverlaps };
}

function appendHeaders(board) {
  const dayCorner = document.createElement("div");
  dayCorner.className = "corner-cell corner-cell--day";
  dayCorner.setAttribute("aria-hidden", "true");
  board.append(dayCorner);

  const roomCorner = document.createElement("div");
  roomCorner.className = "corner-cell corner-cell--room";
  roomCorner.textContent = "Salle";
  board.append(roomCorner);

  PLANNING_DATA.days.forEach((day, dayIndex) => {
    const dayHeader = document.createElement("div");
    dayHeader.className = "day-header day-start day-end";
    dayHeader.style.gridColumn = `${2 + dayIndex * PLANNING_DATA.rooms.length} / span ${PLANNING_DATA.rooms.length}`;
    dayHeader.textContent = day.label;
    board.append(dayHeader);

    PLANNING_DATA.rooms.forEach((room, roomIndex) => {
      const roomHeader = document.createElement("div");
      roomHeader.className = "room-header";
      if (roomIndex === 0) roomHeader.classList.add("day-start");
      if (roomIndex === PLANNING_DATA.rooms.length - 1) roomHeader.classList.add("day-end");
      roomHeader.style.gridColumn = String(2 + dayIndex * PLANNING_DATA.rooms.length + roomIndex);
      roomHeader.textContent = String(room);
      roomHeader.setAttribute("aria-label", `${day.label}, salle ${room}`);
      board.append(roomHeader);
    });
  });
}

function createAxis(period) {
  const axis = document.createElement("div");
  axis.className = "period-axis";

  const name = document.createElement("span");
  name.className = "period-name";
  name.textContent = period.label;
  axis.append(name);

  const startHour = timeToMinutes(period.start) / 60;
  const endHour = timeToMinutes(period.end) / 60;
  const duration = endHour - startHour;

  for (let hour = startHour; hour <= endHour; hour += 1) {
    const label = document.createElement("span");
    label.className = "hour-label";
    if (hour === startHour) label.classList.add("hour-label--start");
    if (hour === endHour) label.classList.add("hour-label--end");
    label.style.top = `${((hour - startHour) / duration) * 100}%`;
    label.textContent = `${hour}h`;
    axis.append(label);
  }

  return axis;
}

function describeSlot(dayId, room, hour) {
  return `${dayById.get(dayId).label.toLowerCase()}, salle ${room}, de ${hour} h à ${hour + 1} h`;
}

function conflictBackground(colors) {
  if (colors.length === 2) {
    return `linear-gradient(135deg, ${colors[0]} 0 47%, #ffffff 47% 53%, ${colors[1]} 53% 100%)`;
  }

  const segment = 100 / colors.length;
  const stops = colors
    .map((color, index) => `${color} ${index * segment}% ${(index + 1) * segment}%`)
    .join(", ");
  return `conic-gradient(${stops})`;
}

function renderHourCell(cell, key, dayId, room, hour) {
  const occupantIds = [...(assignments.get(key) ?? [])];
  const professionals = occupantIds.map((id) => professionalById.get(id)).filter(Boolean);
  const names = professionals.map((professional) => professional.name);

  cell.classList.toggle("is-occupied", professionals.length > 0);
  cell.classList.toggle("is-conflict", professionals.length > 1);
  cell.style.removeProperty("--cell-color");
  cell.style.removeProperty("--cell-background");

  if (professionals.length === 1) {
    cell.style.setProperty("--cell-color", professionals[0].color);
  } else if (professionals.length > 1) {
    cell.style.setProperty(
      "--cell-background",
      conflictBackground(professionals.map((professional) => professional.color)),
    );
  }

  const place = describeSlot(dayId, room, hour);
  const detail = names.length ? names.join(" et ") : "libre";
  cell.title = `${place} · ${detail}`;
  cell.setAttribute("aria-label", `${place}, ${detail}`);
}

function countInteractiveConflicts() {
  return [...assignments.values()].filter((occupants) => occupants.size > 1).length;
}

function updateSelectionStatus(message) {
  const status = document.querySelector("#selectionStatus");
  const conflicts = countInteractiveConflicts();
  status.textContent = conflicts
    ? `${message} · ${conflicts} conflit${conflicts > 1 ? "s" : ""} à vérifier.`
    : message;
}

function toggleHour(dayId, room, hour) {
  if (!selectedProfessionalId) {
    updateSelectionStatus("Sélectionnez d’abord un kiné dans la légende.");
    return;
  }

  const key = slotKey(dayId, room, hour);
  const occupants = assignments.get(key) ?? new Set();
  const wasPresent = occupants.has(selectedProfessionalId);

  if (wasPresent) {
    occupants.delete(selectedProfessionalId);
  } else {
    occupants.add(selectedProfessionalId);
  }

  if (occupants.size) assignments.set(key, occupants);
  else assignments.delete(key);

  renderHourCell(hourCellByKey.get(key), key, dayId, room, hour);
  renderNewPlanning();
  savePlanning();

  const professional = professionalById.get(selectedProfessionalId);
  const action = wasPresent ? "retiré" : "ajouté";
  updateSelectionStatus(
    `${professional.name} ${action} · ${describeSlot(dayId, room, hour)}.`,
  );
}

function createHourCell(dayId, room, hour) {
  const key = slotKey(dayId, room, hour);
  const cell = document.createElement("button");
  cell.type = "button";
  cell.className = "hour-cell";
  cell.dataset.slotKey = key;
  cell.addEventListener("click", () => toggleHour(dayId, room, hour));
  hourCellByKey.set(key, cell);
  renderHourCell(cell, key, dayId, room, hour);
  return cell;
}

function appendPeriod(board, period) {
  const band = document.createElement("div");
  band.className = `period-band period-band--${period.id === "matin" ? "morning" : "afternoon"}`;
  band.style.setProperty(
    "--hours",
    String((timeToMinutes(period.end) - timeToMinutes(period.start)) / 60),
  );
  band.append(createAxis(period));

  PLANNING_DATA.days.forEach((day) => {
    PLANNING_DATA.rooms.forEach((room, roomIndex) => {
      const track = document.createElement("div");
      track.className = "room-track";
      if (roomIndex === 0) track.classList.add("day-start");
      if (roomIndex === PLANNING_DATA.rooms.length - 1) track.classList.add("day-end");
      track.setAttribute("aria-label", `${day.label}, salle ${room}, ${period.label.toLowerCase()}`);

      periodHours(period).forEach((hour) => track.append(createHourCell(day.id, room, hour)));

      band.append(track);
    });
  });

  board.append(band);
}

function appendLunchGap(board) {
  const gap = document.createElement("div");
  gap.className = "lunch-gap";
  const label = document.createElement("span");
  label.className = "lunch-label";
  label.textContent = "12–13h";
  gap.append(label);
  board.append(gap);
}

function renderLegend() {
  const legend = document.querySelector("#legend");

  PLANNING_DATA.professionals
    .filter((professional) => professional.active)
    .forEach((professional) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "legend-item";
      item.style.setProperty("--person-color", professional.color);
      item.style.setProperty("--person-ink", professional.ink);
      item.dataset.professionalId = professional.id;
      item.setAttribute("aria-pressed", "false");
      item.textContent = professional.name;
      item.addEventListener("click", () => {
        selectedProfessionalId =
          selectedProfessionalId === professional.id ? null : professional.id;

        legend.querySelectorAll(".legend-item").forEach((button) => {
          button.setAttribute(
            "aria-pressed",
            String(button.dataset.professionalId === selectedProfessionalId),
          );
        });

        updateSelectionStatus(
          selectedProfessionalId
            ? `${professional.name} sélectionné · cliquez sur une heure pour l’ajouter ou la retirer.`
            : "Sélection annulée · choisissez un kiné pour modifier le planning.",
        );
      });
      legend.append(item);
    });
}

function resetPlanning() {
  if (!window.confirm("Réinitialiser les deux plannings et effacer les essais mémorisés sur ce navigateur ?")) return;
  assignments = buildInitialAssignments();
  offsitePreferences = { ...PLANNING_DATA.defaultOffsitePreferences };
  hourCellByKey.forEach((cell, key) => {
    const [dayId, room, hour] = key.split("|");
    renderHourCell(cell, key, dayId, Number(room), Number(hour));
  });
  renderNewPlanning();
  savePlanning();
  updateSelectionStatus("Planning réinitialisé à l’organisation de départ.");
}

function initializePlanning() {
  const board = document.querySelector("#planningBoard");
  const validation = validateData();
  assignments = buildInitialAssignments();
  restorePlanning();

  appendHeaders(board);
  appendPeriod(board, PLANNING_DATA.periods[0]);
  appendLunchGap(board);
  appendPeriod(board, PLANNING_DATA.periods[1]);
  renderLegend();
  buildNewPlanning();
  document.querySelector("#resetButton").addEventListener("click", resetPlanning);
  document.querySelectorAll("[data-print-target]").forEach((button) => {
    button.addEventListener("click", () => printPlanning(button.dataset.printTarget));
  });

  const status = document.querySelector("#validationStatus");
  status.textContent = validation.errors.length
    ? `${validation.errors.length} incohérence(s) dans les données.`
    : `${validation.blockingConflicts.length} conflit(s) bloquant(s) détecté(s).`;
}

if (typeof window !== "undefined") window.PLANNING_DATA = PLANNING_DATA;
if (typeof document !== "undefined") initializePlanning();
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    PLANNING_DATA,
    validateData,
    timeToMinutes,
    periodHours,
    buildInitialAssignments,
    summarizeNewProfessional,
    decodeSavedPlanning,
    STORAGE_KEY,
  };
}
