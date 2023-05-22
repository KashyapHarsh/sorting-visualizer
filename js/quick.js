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

const quickSort = async (array, low, high) => {

    if (low < high) {
        const pivotIndex = await partition(array, low, high);
        await quickSort(array, low, pivotIndex - 1);
        await quickSort(array, pivotIndex + 1, high);
    }
};

const partition = async (array, low, high) => {
    
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
        insertArrayToHtml(array);
        highlightElements(j, high, 'compared');
        setStatus('comparing');
        await sleep(speed);
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            insertArrayToHtml(array);
            highlightElements(i, j, 'swapped');
            setStatus('swapping');
            await sleep(speed);
        }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    insertArrayToHtml(array);
    highlightElements(i + 1, high, 'swapped');
    setStatus('swapping');
    await sleep(speed);
    
    return i + 1;
};

const quickSortWrapper = async () => {
    let time = null
    const startTime = new Date().getMilliseconds();
    const array = parseArrayInput(document.getElementById('array-input').value);
    if (!array) {
        document.getElementById('input-error').innerHTML = 'Incorrect input!';
        return;
    }
    document.getElementById('input-error').innerHTML = '';
    const n = array.length;
    await quickSort(array, 0, n - 1);
    insertArrayToHtml(array);
    document.getElementById('status').innerHTML = '';
    const endTime = new Date().getMilliseconds();
    time = endTime - startTime;
    document.getElementById('time').innerText = `${time} ms `
};

document.getElementById('submit-array').addEventListener('click', quickSortWrapper);