import React from "react"
import styles from "./BibleReader.module.scss"

export async function BibleReader() {
  const res = await fetch(`http://localhost:8080/bible/1+John`, {
    cache: "no-store",
  })

  const data = await res.json()
  const book = JSON.parse(data.data)

  function bibleTextParser(text: string) {
    let sectionsArr: Record<string, string>[] = []

    // Split the text by double line breaks to get the sections
    const sections = text.split(/\n\n/g)

    sections.forEach((section) => {
      let sectionObj = { heading: "", sectionText: "" }

      // Check for a heading at the start of the section
      const headingMatch = section.match(/^(.*?)(?=\s*\[\d+\]|$)/)

      if (headingMatch) {
        // Add the heading to the object
        sectionObj.heading = headingMatch[0].trim()
        // Remove the heading from the section
        section = section.replace(headingMatch[0], "")
      }

      // Add the section text to the object
      sectionObj.sectionText = section.trim()

      // Add the section object to the array
      sectionsArr.push(sectionObj)
    })

    return sectionsArr
  }

  return (
    <div className={styles["bible-reader"]}>
      {Object.entries(book).map(([chapter, text], key) => {
        const sections = bibleTextParser(text as string)
        console.log(sections)
        return (
          <div key={key}>
            <h2 className={styles["chapter"]}>{chapter}</h2>
            {sections.map(({ heading, sectionText }) => (
              <>
                <h3 className={styles["heading"]}>{heading}</h3>
                <p className={styles["passage"]}>{sectionText}</p>
              </>
            ))}
          </div>
        )
      })}
    </div>
  )
}
