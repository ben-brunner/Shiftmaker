export default function (activitiesConvergence = [], action) {
  if (action.type == "addActivitiesToConvergence") {
   
    let activitiesConvergenceCopy = [...activitiesConvergence]
    activitiesConvergenceCopy.push(action.fiche)
    return activitiesConvergenceCopy;
  } else {
    return activitiesConvergence;
  }
}
