const speed = 500;
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const parseArrayInput = (inputStr) => {
    const tokens = inputStr.trim().split(/\s+/);
    const array = tokens.map(elem => parseFloat(elem));
    if(array.length !== tokens.length || array.some(elem => isNaN(elem)))
        return null;
    return array;
}
const insertArrayToHtml = (array) => {
  const html = '<div class="array-element my-2 ms-3">' + 
      array.join('</div><div class="array-element my-2 mx-2">') + 
          '</div>';
  document.getElementById('array').innerHTML = html;
}
const highlightElements = (i, j, additionalClass) => {
    const array = document.getElementById('array').children;
    array[i].classList.add(additionalClass);
    array[j].classList.add(additionalClass);
}
const setStatus = (status) => {
    const statusElem = document.getElementById('status');
    statusElem.innerHTML = status === 'comparing' ? 'Comparing...' : 'Swapping...';
    statusElem.className = status;
}

const mergeSort = async (array) => {
  
    if (array.length <= 1) {
      return array;
    }
    
    const mid = Math.floor(array.length / 2);
    const leftArray = array.slice(0, mid);
    const rightArray = array.slice(mid);
    
    const sortedLeft = await mergeSort(leftArray);
    const sortedRight = await mergeSort(rightArray);
    
    return merge(sortedLeft, sortedRight);
  };
  
  const merge = async (leftArray, rightArray) => {
    const mergedArray = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      insertArrayToHtml([...leftArray, ...rightArray]);
      highlightElements(leftIndex, rightIndex + leftArray.length, 'compared');
      setStatus('comparing');
      await sleep(speed);
      
      if (leftArray[leftIndex] < rightArray[rightIndex]) {
        mergedArray.push(leftArray[leftIndex]);
        leftIndex++;
      } else {
        mergedArray.push(rightArray[rightIndex]);
        rightIndex++;
      }
    }
    
    while (leftIndex < leftArray.length) {
      mergedArray.push(leftArray[leftIndex]);
      leftIndex++;
    }
    
    while (rightIndex < rightArray.length) {
      mergedArray.push(rightArray[rightIndex]);
      rightIndex++;
    }
    
    insertArrayToHtml(mergedArray);
    document.getElementById('status').innerHTML = '';
    
    
    return mergedArray;
  };
  
  const mergeSortWrapper = async () => {
    const startTime = new Date().getMilliseconds();
    const array = parseArrayInput(document.getElementById('array-input').value);
    if (!array) {
      document.getElementById('input-error').innerHTML = 'Incorrect input!';
      return;
    }
    document.getElementById('input-error').innerHTML = '';
    
    const sortedArray = await mergeSort(array);
    insertArrayToHtml(sortedArray);
    const endTime = new Date().getMilliseconds();
    time = endTime - startTime;
    document.getElementById('time').innerText = `${time} ms `
  };
  
  document.getElementById('submit-array').addEventListener('click', mergeSortWrapper);