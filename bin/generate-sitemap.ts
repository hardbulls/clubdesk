import { writeFile } from "fs"
import { promisify } from "util"
import path from "path"
import { JSDOM } from "jsdom"
import { parseGermanDate } from "../src/util/date"
import { escapeHtmlEntities } from "../src/util/html"

const BASE_URL = "https://www.hardbulls.com"
const writeFileAsync = promisify(writeFile)

async function downloadNews() {
    const html = await fetch(`${BASE_URL}/?b=100326&c=NL&s=djEt6359R0cItTBp-Cp2EqrjtXYts5XosM1ILmMJMivhyQM=`).then(
        (response) => response.text()
    )

    const dom = new JSDOM(html)
    const rows = dom.window.document.querySelector("div.cd-newslist-tile-v.cd-tile-v")

    if (!rows) {
        throw new Error("Cannot parse news page")
    }

    const news: any[] = []
    const rowCollection = rows.querySelectorAll("div.cd-tile-v-box")

    for (const row of rowCollection.values()) {
        const title = row.querySelector(".cd-tile-v-main-heading")?.textContent?.trim()
        const dateText = row.querySelector(".cd-tile-v-main-subheading")?.textContent?.trim()
        const urlPathQuoted = row.getAttribute("onclick")?.replace("window.location.href=", "")

        if (title && dateText && urlPathQuoted) {
            const date = parseGermanDate(dateText)
            const url = BASE_URL + urlPathQuoted.substring(1, urlPathQuoted.length - 1)

            const priority = 0.8

            news.push({ title, date: date.toISOString(), url, priority })
        }
    }

    return news
}

async function main() {
    const news = await downloadNews()

    const currentMonth = new Date()

    currentMonth.setDate(1)

    const currentMonthISO = currentMonth.toISOString()

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<url>
  <loc>${BASE_URL}</loc>
  <lastmod>${currentMonthISO}</lastmod>
  <priority>1.00</priority>
</url>
<url>
  <loc>${BASE_URL}/verein</loc>
  <lastmod>${currentMonthISO}</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>${BASE_URL}/teams</loc>
  <lastmod>${currentMonthISO}</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>${BASE_URL}/events</loc>
  <lastmod>${currentMonthISO}</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>${BASE_URL}/ballpark</loc>
  <lastmod>${currentMonthISO}</lastmod>
  <priority>0.70</priority>
</url>
<url>
  <loc>${BASE_URL}/trainingszeiten</loc>
  <lastmod>${currentMonthISO}</lastmod>
  <priority>0.70</priority>
</url>
<url>
  <loc>${BASE_URL}/spielplan</loc>
  <lastmod>${currentMonthISO}</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>${BASE_URL}/sponsoren</loc>
  <lastmod>${currentMonthISO}</lastmod>
  <priority>0.70</priority>
</url>
<url>
  <loc>${BASE_URL}/v-cup</loc>
  <lastmod>${currentMonthISO}</lastmod>
  <priority>0.60</priority>
</url>
<url>
  <loc>${BASE_URL}/live</loc>
  <lastmod>${currentMonthISO}</lastmod>
  <priority>0.10</priority>
</url>
<url>
  <loc>${BASE_URL}/impressum</loc>
  <lastmod>${currentMonthISO}</lastmod>
  <priority>0.20</priority>
</url>
<url>
  <loc>${BASE_URL}/media</loc>
  <lastmod>${currentMonthISO}</lastmod>
  <priority>0.50</priority>
</url>
<url>
  <loc>${BASE_URL}/teams/bulls</loc>
  <lastmod>${currentMonthISO}</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>${BASE_URL}/mitgliedschaft</loc>
  <lastmod>${currentMonthISO}</lastmod>
  <priority>0.70</priority>
</url>
<url>
  <loc>${BASE_URL}/${escapeHtmlEntities("?b=100326&amp;c=NL")}</loc>
  <lastmod>${currentMonthISO}</lastmod>
  <priority>0.80</priority>
</url>
${news
    .map((newsItem) => {
        return `
  <url>
  <loc>${escapeHtmlEntities(newsItem.url.replace(`${BASE_URL}/willkommen`, `${BASE_URL}/`))}</loc>
  <lastmod>${newsItem.date}</lastmod>
  <priority>${newsItem.priority}</priority>
</url>
  `
    })
    .join("")}
</urlset>`

    await writeFileAsync(path.join(__dirname, "../dist/sitemap.xml"), xml, "utf8")
}

main()
