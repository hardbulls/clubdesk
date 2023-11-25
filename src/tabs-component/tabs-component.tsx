import './tabs-component.css'
import {DOMcreateElement} from "../jsx";
import {replaceElementChildren} from "../util/html";

type Tab = {
    id: string,
    title: JSX.Element|string,
    content: (() => JSX.Element)
}

type Props = {
    linkClass: string,
    tabs: Tab[]
}

export const TabsComponent = ({linkClass, tabs}: Props) => {
    const componentId = (Math.random() + 1).toString(36).substring(7);
    const CN = "hb-tabs-component";

    if (tabs.length === 0) {
        return <div/>;
    }

    const loadedTabs: string[] = [];
    const currentActive = tabs[0]?.id;

    const switchTab = (currentLink: HTMLElement, selectTabId: string, tab: Tab) => {
        const tabElements = document.querySelectorAll(`#${CN}-${componentId}-tab-content > .${CN}-tab-content`) as NodeListOf<HTMLElement>;

        for (const tabElement of tabElements ) {
            if (tabElement.id !== selectTabId) {
                tabElement.classList.remove("active-tab")
                tabElement.classList.add("inactive-tab");
            } else {
                tabElement.classList.remove("inactive-tab");
                tabElement.classList.add("active-tab")

                if (!loadedTabs.includes(selectTabId)) {
                    loadedTabs.push(selectTabId)

                    replaceElementChildren(tabElement, tab.content())

                }
            }
        }

        const tabLinks = document.querySelectorAll(`#${CN}-${componentId}-tab-links > .${CN}-tab-link`) as NodeListOf<HTMLElement>;

        for (const link of tabLinks) {
            const linkElement = (link as HTMLLinkElement);

            if (linkElement !== currentLink) {
                linkElement.classList.remove("active-tab");
                linkElement.classList.add("inactive-tab");
            } else {
                linkElement.classList.remove("inactive-tab");
                linkElement.classList.add("active-tab");
            }
        }
    };

    const linkElements: JSX.Element[] = [];
    const tabElements: JSX.Element[] = [];

    for (const tab of tabs) {
        const elementId = `${CN}-${componentId}-tab-${tab.id}`;

        linkElements.push(
            <span
                className={`${CN}-tab-link ${linkClass} ${tab.id === currentActive ? `active-tab` : `inactive-tab`}`}
                onClick={(event) => switchTab(event.currentTarget, elementId, tab)}
                >{tab.title}</span>
        )

        tabElements.push(
            <div id={elementId}
                 className={`${CN}-tab-content ${tab.id === currentActive ? "active-tab" : 'inactive-tab'}`}>
                {tab.id === currentActive ? tab.content() : undefined}
            </div>
        )
    }

    return (
        <div>
            <div id={`${CN}-${componentId}-tab-links`} className={`${CN}-tab-links`}>
                {linkElements}
            </div>
            <div id={`${CN}-${componentId}-tab-content`}>
                {tabElements}
            </div>
        </div>
    )
}
