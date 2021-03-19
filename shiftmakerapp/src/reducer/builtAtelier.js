export default function (etapeSelected = {}, action) {
  if (action.type == "selectEtape") {
    let etapeSelectedCopy = action.etape;
    return etapeSelectedCopy;
  } else {

    return etapeSelected

  }
}
