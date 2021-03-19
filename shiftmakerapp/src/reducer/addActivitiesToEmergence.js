export default function (activitiesEmergence = [], action) {
  if (action.type == "addActivitiesToEmergence") {
    let activitiesEmergenceCopy = [...activitiesEmergence];
    activitiesEmergenceCopy.push(action.fiche);
    return activitiesEmergenceCopy;
  } else {
    return activitiesEmergence;
  }
}
