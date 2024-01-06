import './statistics.css'
import {DOMcreateElement} from "../jsx";
import type {StatisticProperty} from "../types/StatisticProperty";
import {CalculationType} from "../types/enum/CalculationType";
import {PitchingProperties} from "../types/PitchingProperty";
import {BattingProperties} from "../types/BattingProperties";
import type {Player} from "../model/Player";
import type {PlayerStats} from "../model/PlayerStats";
import {CURRENT_YEAR} from "../util/date";

const playerContainerCache: { [key: string]: JSX.Element | undefined } = {}

const TableHeader = ({headers}: { headers: StatisticProperty[] }) => {
    return (
        <thead>
        <tr>
            <th>Jahr</th>
            {headers.map(property => (
                <th>
                    <abbr className="has-tooltip" title={property.name}>{property.abbreviation.toUpperCase()}</abbr>
                </th>
            ))}
        </tr>
        </thead>
    )
}

const TableRow = ({year, headers, values}: {
    year: string,
    headers: StatisticProperty[],
    values: { [key: string]: string | number | undefined }
}) => {
    return (
        <tr className={year === CURRENT_YEAR.toString() ? 'hardbulls-stats-current-year' : ''}>
            <td><strong>{year}</strong></td>
            {headers.map(header => {
                return (
                    <td>
                        {renderValue(header.type, values[header.abbreviation]?.toString())}
                    </td>
                )
            })}
        </tr>
    )
}

const renderValue = (type: CalculationType, value: string | undefined): string => {
    if (!value) {
        value = "0"
    }

    if (type === CalculationType.AVG) {
        return Number.parseFloat(value).toFixed(3)
    }

    return Number.parseFloat(value) % 1 === 0 ? value : Number.parseFloat(value).toFixed(2)
}

interface Props {
    player: Player,
    currentStats?: PlayerStats | undefined | null
}

export const Statistics = ({player}: Props): JSX.Element => {
    const name = player.name;
    const cached = playerContainerCache[name];

    if (cached) {
        return cached
    }

    const pitchingRows: JSX.Element[] = [];
    const battingRows: JSX.Element[] = [];
    let hasPitching = false;
    let hasBatting = false;

    const stats = player.stats

    if (stats) {
        for (const [year, {pitching, batting}] of Object.entries(stats)) {
            if (pitching) {
                hasPitching = true;
                pitchingRows.push(
                    <TableRow year={year} headers={PitchingProperties} values={pitching}/>
                )
            }

            if (batting) {
                hasBatting = true
                battingRows.push(
                    <TableRow year={year} headers={BattingProperties} values={batting}/>
                )
            }
        }
    }

    const battingTableBody = hasBatting && (
        <table>
            <TableHeader headers={BattingProperties}></TableHeader>
            <tbody>
            {...battingRows}
            </tbody>
        </table>
    )

    const pitchingTableBody = hasPitching && (
        <table>
            <TableHeader headers={PitchingProperties}></TableHeader>
            <tbody>
            {...pitchingRows}
            </tbody>
        </table>
    )

    const element = (
        <div>
            <h2>{name}</h2>
            {battingTableBody && (
                <div>
                    <h3>Batting</h3>
                    {battingTableBody}
                </div>
            )}

            {pitchingTableBody && (
                <div>
                    <h3>Pitching</h3>
                    {pitchingTableBody}
                </div>
            )}
            {!hasBatting && !hasPitching && 'Keine Statistiken gefunden.'}
        </div>
    );

    playerContainerCache[name] = element

    return element;
}
