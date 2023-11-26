import './select-component.css'
import {DOMcreateElement} from "../jsx";

type SelectOption = {
    value: string|number,
    label: string|number
}

type Props = {
    label?: string,
    options: SelectOption[],
    onChange: (value: string) => void,
    selected: string|number
}

export const SelectComponent = ({ label, options, selected, onChange }: Props) => {
    const CN = 'hb-select-component';

    return (
        <div className={CN}>
            { label && <div className={`${CN}-label`}>{label}</div> }
            <div className={`${CN}-select`}>
                <select value={selected} onChange={(event) => {
                    onChange(event.currentTarget.value);
                }}>
                    {options.map(option => {
                        if (option.value.toString() === selected.toString()) {
                            return (
                                <option selected value={option.value}>{option.label}</option>
                            )
                        }

                        return (
                            <option value={option.value}>{option.label}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}
