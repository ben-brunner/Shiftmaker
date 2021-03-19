export default function (activitiesInclusion= [], action) {
  if (action.type == "addActivitiesToInclusion") {
    let activitiesInclusionCopy = [...activitiesInclusion];
    activitiesInclusionCopy.push(action.fiche);
    return activitiesInclusionCopy;
  } else {
    return activitiesInclusion;
  }
}
