import { CSS_SVG_SHARED_PROPERTIES } from "./css_svg_shared_properties";

async function downloadSVG(enableHighContrastStroke: boolean = false) {

    const SVGName = document.querySelector("#fileNameInput2")!.getAttribute("value") ?? "blocks";
    const SVGCopy = document.querySelector("#blocksEditor > div > svg")!.cloneNode(true) as SVGSVGElement;
    const SVG = document.querySelector("#blocksEditor > div > svg")!;

    SVG.parentElement!.appendChild(SVGCopy);
    SVGCopy.querySelector('.blocklyMainBackground')!.remove();
    SVGCopy.querySelector('.blocklyScrollbarBackground')!.remove();
    addComputedStyleProperties(SVGCopy);
    if (enableHighContrastStroke) {
        SVGCopy.querySelectorAll('.blocklyPath').forEach((path) => { 
            path.setAttribute("stroke", "#000000");
            path.setAttribute("stroke-width", "2px");
        });

    }

    cropSVG(SVGCopy);

    const svgData = new XMLSerializer().serializeToString(SVGCopy);
    const blob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${SVGName}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    SVG.parentElement!.removeChild(SVGCopy);
}

function addComputedStyleProperties(element: Element) {
    // Obtient les propriétés calculées
    const computedStyles = getComputedStyle(element);

    for (let property of computedStyles) {
        if (CSS_SVG_SHARED_PROPERTIES.includes(property) && element.getAttribute(property) === null) {
            // Ajoute la propriété calculée à l'élément
            element.setAttribute(property, computedStyles.getPropertyValue(property));
        }
    }
    for(let property of element.getAttributeNames()) {
        if (element.getAttribute(property) === "transparent")
            element.setAttribute(property, "none");
    }
    // Parcourt les enfants de l'élément
    for (let child of Array.from(element.children)) {
        // Appelle récursivement la fonction pour les enfants
        addComputedStyleProperties(child as Element);
    }
}

function cropSVG(svgEl : SVGSVGElement) {
    const bbox = svgEl.getBBox();
    svgEl.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
    return svgEl;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.type) {
        case 'can_download':
            if (document.querySelector("#blocksEditor") !== null)
                sendResponse(true);
            else
                sendResponse(false);
            break;
        case 'download':
            downloadSVG(message.highContrastStroke);
            break;
    }
});