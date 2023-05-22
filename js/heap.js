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

const heapSort = async () => {
  const startTime = new Date().getMilliseconds();
    const array = parseArrayInput(document.getElementById('array-input').value);
    if (!array) {
      document.getElementById('input-error').innerHTML = 'Incorrect input!';
      return;
    }
    document.getElementById('input-error').innerHTML = '';
  
    const n = array.length;
  
    // Build the max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(array, n, i);
    }
  
    // Extract elements from the heap one by one
    for (let i = n - 1; i > 0; i--) {
      // Move current root (largest element) to the end
      [array[0], array[i]] = [array[i], array[0]];
  
      insertArrayToHtml(array);
      highlightElements(0, i, 'swapped');
      setStatus('swapping');
      await sleep(speed);
  
      // Heapify the reduced heap
      await heapify(array, i, 0);
    }
  
    insertArrayToHtml(array);
    document.getElementById('status').innerHTML = '';
    const endTime = new Date().getMilliseconds();
    time = endTime - startTime;
    document.getElementById('time').innerText = `${time} ms `
  };
  
  const heapify = async (array, n, i) => {
    let largest = i; // Initialize the largest as root
    const left = 2 * i + 1; // Left child index
    const right = 2 * i + 2; // Right child index
  
    // If left child is larger than root
    if (left < n && array[left] > array[largest]) {
      largest = left;
    }
  
    // If right child is larger than largest so far
    if (right < n && array[right] > array[largest]) {
      largest = right;
    }
  
    // If largest is not the root
    if (largest !== i) {
      // Swap the elements
      [array[i], array[largest]] = [array[largest], array[i]];
  
      insertArrayToHtml(array);
      highlightElements(i, largest, 'swapped');
      setStatus('swapping');
      await sleep(speed);
  
      // Recursively heapify the affected sub-tree
      await heapify(array, n, largest);
    }
  };
  
  document.getElementById('submit-array').addEventListener('click', heapSort);