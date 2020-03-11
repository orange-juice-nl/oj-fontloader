import "oj-event"
import { get } from "oj-ajax"

export default class FontLoader {
  private static loaded: { [fontFam: string]: boolean } = {}

  public static isLoaded(name: string) {
    return FontLoader.loaded[name] === true
  }

  public static async loadCustomFont(name: string, url: string, i = 0) {
    if (FontLoader.loaded[name] !== undefined) return name
    FontLoader.loaded[name] = false

    const file = await get<Blob>(url, { responseType: "blob" })
    const s = document.createElement('style')
    s.setAttribute("type", "text/css")
    s.appendChild(document.createTextNode(`@font-face { font-family: '${name}'; src: url('${URL.createObjectURL(file)}'); style: 'normal'; weight: 400; }`));
    (document.head as HTMLHeadElement).appendChild(s)

    await FontLoader.renderOnBody(name, i * 10).then(() => FontLoader.loaded[name] = true)
    return name
  }

  private static renderOnBody(fontFamily: string, top = 0, left = 0) {
    //HACK to load fontfamily before canvas render
    var temp = document.createElement("div")
    temp.classList.add("font-test")
    var tempImg = document.createElement("img")
    var tempSpan = document.createElement("span")
    tempSpan.style.fontFamily = "\"" + fontFamily + "\""
    tempSpan.innerText = fontFamily
    temp.appendChild(tempSpan)
    temp.appendChild(tempImg)
    temp.style.position = "fixed"
    temp.style.left = `${left}px`
    temp.style.top = `${top}px`
    document.body.appendChild(temp)

    var p = new Promise(res =>
      tempImg.on("load", e => {
        setTimeout(() => document.body.removeChild(temp), 100)
        res()
      }))
    tempImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    return p
  }

  public static async loadCustomFonts(families: { name: string, url: string }[]) {
    return Promise.all(families.filter((item, i, ar) =>
      ar.findIndex(x => x.name === item.name) === i).map((x, i) =>
        FontLoader.loadCustomFont(x.name, x.url, i)))
  }

  public static async loadGoogleFont(name: string, weights: number[] = []) {
    if (FontLoader.loaded[name] !== undefined)
      return name
    FontLoader.loaded[name] = false

    const nameStr = name.replace(/\s/g, "+")
    const weightStr = weights.length > 0 ? `:${weights.join(",")}` : ""

    const res = await get(`https://fonts.googleapis.com/css?family=${nameStr}${weightStr}`)
    if (typeof res !== "string")
      throw new Error("failed to load " + name)

    const s = document.createElement('style')
    s.setAttribute("type", "text/css")
    s.appendChild(document.createTextNode(res));
    (document.head as HTMLHeadElement).appendChild(s)

    await FontLoader.renderOnBody(name).then(() =>
      FontLoader.loaded[name] = true)

    return name
  }

  public static async loadGoogleFonts(families: { name: string, weights?: number[] }[]) {
    const succeeded: string[] = []
    const failed: string[] = []

    await Promise.all(
      families.map(x =>
        this.loadGoogleFont(x.name, x.weights)
          .then(() =>
            succeeded.push(x.name))
          .catch(() =>
            failed.push(x.name))))
    return [succeeded, failed]
  }
}