import domToImage from 'dom-to-image';

const captureElement = async (element: HTMLElement) => {
    const img = await domToImage.toPng(element, {bgcolor:'#F1DEC9'})
    return img
}

export default captureElement;  