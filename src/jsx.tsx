/**
 * A helper function that ensures we won't work with null values
 */
function nonNull(val: { [key: string]: string | undefined | null }) {
    return val ? val : {}
}

/**
 * How do we handle children. Children can either be:
 * 1. Calls to DOMcreateElement, returns a Node
 * 2. Text content, returns a Text
 *
 * Both can be appended to other nodes.
 */
function DOMparseChildren(children: Array<HTMLElement | string>) {
    return children.map(child => {
        if (typeof child === 'string') {
            return document.createTextNode(child);
        }

        return child;
    }).filter(Boolean)
}

const booleanAttributes = [
    'allowfullscreen',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'inert',
    'ismap',
    'itemscope',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected',
]

/**
 * How do we handle regular nodes.
 * 1. We create an element
 * 2. We apply all properties from JSX to this DOM node
 * 3. If available, we append all children.
 */
function DOMparseNode(element: string, properties: {
    [key: string]: string
}, children: Array<HTMLElement | string>): HTMLElement {
    const el = document.createElement(element) as HTMLElement;

    Object.keys(nonNull(properties)).forEach(key => {
        const value = properties[key];

        if (booleanAttributes.includes(key.toLowerCase())) {
            el.setAttribute(key.toLowerCase(), key.toLowerCase());
        } else if (value) {

            if (key === 'title') {
                el.setAttribute('title', value.replace('\\n', '\\a'))
            } else if (key.startsWith("on") && key.toLowerCase() in window && typeof value === 'function') {
                el.addEventListener(key.toLowerCase().substring(2, key.length), value);
            } else if (key === 'className') {
                el.className = value.trim()
            } else if (key === "style" && typeof value === 'object') {
                el.setAttribute('style', Object.keys(value).map(cssKey => {
                    const cssValue = value[cssKey];
                    const convertedKey = cssKey.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

                    return `${convertedKey}: ${cssValue}`;
                }).join('; '));
            } else {
                el.setAttribute(key, value);
            }
        }
    })

    DOMparseChildren(children).forEach(child => {
        if (Array.isArray(child)) {
            el.append(...child)
        } else {
            el.append(child)
        }
    });

    return el;
}

/**
 * Our entry function.
 * 1. Is the element a function, than it's a functional component.
 *    We call this function (pass props and children of course)
 *    and return the result. We expect a return value of type Node
 * 2. If the element is a string, we parse a regular node
 */
export function DOMcreateElement(
    // eslint-disable-next-line
    element: ((props: any, ...children: Array<HTMLElement | string>) => HTMLElement) | string,
    properties: { [key: string]: string }, ...children: Array<HTMLElement | string>): HTMLElement {
    if (typeof element === 'function') {
        return element({
            ...nonNull(properties),
            children
        });
    }
    return DOMparseNode(element, properties, children);
}

