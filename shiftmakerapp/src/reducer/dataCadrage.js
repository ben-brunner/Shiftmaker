export default function (dataCadrage = [], action) {
  if (action.type == "saveCadrage") {
    let dataCadrageCopy = [...dataCadrage]

    dataCadrageCopy.push(action.q1)
    dataCadrageCopy.push(action.q2);
    dataCadrageCopy.push(action.q3);
    dataCadrageCopy.push(action.q4);
    dataCadrageCopy.push(action.q5);
    dataCadrageCopy.push(action.q6);
    dataCadrageCopy.push(action.q7);

    console.log(dataCadrageCopy, 'rex')

    return dataCadrageCopy;
  } else  {
    return dataCadrage
  } 
  

}
