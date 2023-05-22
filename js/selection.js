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

const selectionSort = async () => {
    const startTime = new Date().getMilliseconds();
    const array = parseArrayInput(document.getElementById('array-input').value);
    if (!array) {
        document.getElementById('input-error').innerHTML = 'Incorrect input!';
        return;
    }
    document.getElementById('input-error').innerHTML = '';
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            insertArrayToHtml(array);
            highlightElements(minIndex, j, 'compared');
            setStatus('comparing');
            await sleep(speed);
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            insertArrayToHtml(array);
            highlightElements(i, minIndex, 'swapped');
            setStatus('swapping');
            await sleep(speed);
        }
    }
    insertArrayToHtml(array);
    document.getElementById('status').innerHTML = '';
    const endTime = new Date().getMilliseconds();
    time = endTime - startTime;
    document.getElementById('time').innerText = `${time} ms `
};

document.getElementById('submit-array').addEventListener('click', selectionSort);