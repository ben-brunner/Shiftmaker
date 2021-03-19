export default function (activitiesDeclusion = [], action) {
  if (action.type == "addActivitiesToDeclusion") {
    console.log("redux dec");
    let activitiesDeclusionCopy = [...activitiesDeclusion];
    activitiesDeclusionCopy.push(action.fiche);
    return activitiesDeclusionCopy;
  } else {
    return activitiesDeclusion;
  }
}
