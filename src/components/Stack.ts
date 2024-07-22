import { register } from "./framework/register";
import type {Gap} from "./variables/Gap";

export class Stack extends HTMLElement {
    private styleElement: HTMLStyleElement;

    constructor() {
        super();
        // Attach the shadow root
        const shadow = this.attachShadow({ mode: "open" });

        // Create a style element
        this.styleElement = document.createElement("style");
        shadow.appendChild(this.styleElement);

        const slot = document.createElement('slot');
        shadow.append(slot);

        // Initial update of styles
        this.updateStyles();
    }

    static get observedAttributes() {
        return ['direction', "gap", "inline-gap", "block-gap"];
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (Stack.observedAttributes.includes(name) && oldValue !== newValue) {
            this.updateStyles();
        }
    }

    updateStyles() {
        const direction = this.getAttribute('direction') || 'vertical';
        const gap = this.getGapVariable(this.getAttribute('gap') as Gap || 'none');
        const inlineGap = this.getGapVariable(this.getAttribute('inline-gap') as Gap || 'none');
        const blockGap = this.getGapVariable(this.getAttribute('block-gap') as Gap || 'none');

        this.styleElement.textContent = `
            :host {
                display: flex;
                flex-direction: ${direction === 'horizontal' ? 'row' : 'column'};
                gap: ${gap};
                margin-inline: ${inlineGap};
                margin-block: ${blockGap};
            }
        `;
    }

    private getGapVariable(type: Gap): string {
        switch (type) {
            case 'none':
                return '0px';
            case 'small':
                return 'var(--hb-gap-2xs)'; // 16px
            case 'medium':
                return 'var(--hb-gap-md)'; // 32px
            case 'large':
                return 'var(--hb-gap-lg)'; // 40px
            case 'extra-large':
                return 'var(--hb-gap-xl)'; // 56px
            default:
                return 'var(--hb-gap-md)'; // Default to medium if no match
        }
    }


    // Getters and setters for attributes
    get direction() {
        return this.getAttribute('direction');
    }

    set direction(value) {
        if (value) {
            this.setAttribute('direction', value);
        } else {
            this.removeAttribute('direction')
        }
    }


    get gap(): Gap {
        return (this.getAttribute('gap') || 'none') as Gap;
    }

    set gap(value: Gap) {
        if (value) {
            this.setAttribute('gap', value);
        } else {
            this.removeAttribute('gap');
        }
    }


    get inlineGap(): Gap {
        return (this.getAttribute('inline-gap') || 'none') as Gap;
    }

    set inlineGap(value: Gap) {
        if (value) {
            this.setAttribute('inline-gap', value);
        } else {
            this.removeAttribute('inline-gap');
        }
    }

    get blockGap(): Gap {
        return (this.getAttribute('block-gap') || 'none') as Gap;
    }

    set blockGap(value: Gap) {
        if (value) {
            this.setAttribute('block-gap', value);
        } else {
            this.removeAttribute('block-gap');
        }
    }
}

register("stack", Stack);
