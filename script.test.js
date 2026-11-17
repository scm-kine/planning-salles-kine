"use strict";

// Exécution sans dépendance : node --test script.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const {
  PLANNING_DATA, buildInitialAssignments, validateData,
  summarizeNewProfessional, decodeSavedPlanning,
} = require("./script.js");

test("le scénario de départ correspond exactement aux cases et activités validées", () => {
  assert.deepEqual(validateData(), { errors: [], blockingConflicts: [], advisoryOverlaps: [] });
  const initial = buildInitialAssignments();
  const summary = summarizeNewProfessional(initial, PLANNING_DATA.defaultOffsitePreferences);
  assert.equal(summary.length, 10);
  assert.deepEqual(summary.map((item) => item.label), [
    "Salle 3 + espace gym", "Salle 1", "Salle 3 + espace gym", "Salle 1", "Salle 3 + espace gym",
    "Domiciles", "Domiciles", "Salle 3 + espace gym", "Domiciles", "Salle 1 + espace gym",
  ]);
  const expectedSlots = [
    ...["lundi|3", "mardi|1", "mercredi|3", "jeudi|1", "vendredi|3"]
      .flatMap((place) => [8, 9, 10, 11].map((hour) => `${place}|${hour}`)),
    ...["mercredi|3", "vendredi|1"]
      .flatMap((place) => [13, 14, 15, 16, 17, 18].map((hour) => `${place}|${hour}`)),
  ];
  assert.deepEqual([...initial].filter(([, ids]) => ids.has("nouveau")).map(([key]) => key).sort(), expectedSlots.sort());
  assert.ok([...initial.values()].every((ids) => ids.size === 1));
});

test("un planning sans affectation affiche toujours Domiciles ou repos", () => {
  assert.ok(summarizeNewProfessional(new Map()).every((item) => item.label === "Domiciles ou repos" && !item.gym));
});

test("une heure suffit ; toutes les demi-journées sont reportées et seules cinq donnent accès au gym", () => {
  const assignments = new Map();
  for (const day of PLANNING_DATA.days) {
    assignments.set(`${day.id}|3|8`, new Set(["nouveau"]));
    assignments.set(`${day.id}|3|13`, new Set(["nouveau"]));
  }
  const summary = summarizeNewProfessional(assignments);
  assert.deepEqual(summary.filter((item) => item.gym).map((item) => item.key), [
    "lundi|matin", "mercredi|matin", "vendredi|matin",
    "mercredi|apres-midi", "vendredi|apres-midi",
  ]);
  assert.ok(summary.every((item) => item.rooms.join() === "3"));
  assert.equal(summary.find((item) => item.key === "mardi|apres-midi").label, "Salle 3");
});

test("les salles sont uniques et triées, les chevauchements restent signalés", () => {
  const assignments = new Map([
    ["lundi|3|8", new Set(["nouveau"])],
    ["lundi|1|9", new Set(["nouveau", "marine"])],
    ["lundi|3|10", new Set(["nouveau"])],
  ]);
  const item = summarizeNewProfessional(assignments)[0];
  assert.deepEqual(item.rooms, [1, 3]);
  assert.equal(item.label, "Salles 1 et 3 + espace gym");
  assert.equal(item.conflict, true);
});

test("le choix hors cabinet reste disponible après un passage temporaire au cabinet", () => {
  const preferences = { "mardi|matin": "rest", "jeudi|apres-midi": "home" };
  const assignments = new Map([["mardi|1|8", new Set(["nouveau"])]]);
  assert.equal(summarizeNewProfessional(assignments, preferences).find((item) => item.key === "mardi|matin").label, "Salle 1");
  assignments.clear();
  const summary = summarizeNewProfessional(assignments, preferences);
  assert.equal(summary.find((item) => item.key === "mardi|matin").label, "Repos");
  assert.equal(summary.find((item) => item.key === "jeudi|apres-midi").label, "Domiciles");
});

test("une sauvegarde restaure toutes les affectations, y compris les conflits et les retraits", () => {
  const restored = decodeSavedPlanning(JSON.stringify({
    version: 1,
    assignments: [["vendredi|3|18", ["nouveau", "justine"]]],
    offsitePreferences: { "mardi|matin": "rest" },
  }));
  assert.equal(restored.assignments.size, 1);
  assert.deepEqual([...restored.assignments.get("vendredi|3|18")], ["nouveau", "justine"]);
  assert.equal(restored.offsitePreferences["mardi|matin"], "rest");
  assert.equal(decodeSavedPlanning('{"version":1,"assignments":[]}').assignments.size, 0);
});

test("une sauvegarde corrompue ou contenant des cases inconnues est refusée", () => {
  for (const raw of ["invalid", "null", '{"version":2,"assignments":[]}',
    '{"version":1,"assignments":[["lundi|3|12",["nouveau"]]]}',
    '{"version":1,"assignments":[["lundi|6|8",["nouveau"]]]}',
    '{"version":1,"assignments":[["lundi|3|8",["inconnu"]]]}']) {
    assert.throws(() => decodeSavedPlanning(raw));
  }
});
