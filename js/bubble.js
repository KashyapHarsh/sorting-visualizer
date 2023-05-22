const speed = 500;
let time = null;
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
const bubbleSort = async () => {
    let time = null;
    const startTime = new Date().getMilliseconds();
    const array = parseArrayInput(document.getElementById('array-input').value);
    console.log(array)
    if(!array){
        document.getElementById('input-error').innerHTML = 'Incorrect input!';
        return;
    }
    document.getElementById('input-error').innerHTML = '';
    const n = array.length;
    for(let i = n - 1;i > 0;i--)
        for(let j = 0;j < i;j++){
            console.log(i, j)
            insertArrayToHtml(array);
            highlightElements(j, j + 1, 'compared');
            setStatus('comparing');
            await sleep(speed);
            if(array[j] > array[j + 1])
            {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                insertArrayToHtml(array);
                highlightElements(j, j + 1, 'swapped');
                setStatus('swapping');
                await sleep(speed);
            }            
        }
        
    insertArrayToHtml(array);
    
    document.getElementById('status').innerHTML = '';
    const endTime = new Date().getMilliseconds();
    time = endTime - startTime;
    document.getElementById('time').innerText = `${time} ms `
}
document.getElementById('submit-array').addEventListener('click', bubbleSort);