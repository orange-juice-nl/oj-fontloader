const loaded: Record<string, true | Promise<void>> = {}

export const isFontLoaded = (name: string) =>
  loaded[name] === true

const renderOnBody = (fontFamily: string, top = 0, left = 0) => {
  //HACK to load fontfamily before canvas render
  const temp = document.createElement("div")
  temp.classList.add("font-test")
  const tempImg = document.createElement("img")
  const tempSpan = document.createElement("span")
  tempSpan.style.fontFamily = "\"" + fontFamily + "\""
  tempSpan.innerText = fontFamily
  temp.appendChild(tempSpan)
  temp.appendChild(tempImg)
  temp.style.position = "fixed"
  temp.style.left = `${left}px`
  temp.style.top = `${top}px`
  document.body.appendChild(temp)

  const p = new Promise<void>(res =>
    tempImg.addEventListener("load", () =>
      setTimeout(() => {
        document.body.removeChild(temp)
        res()
      }, 100)))
  tempImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
  return p
}

const load = async (name: string, weights: number[] = []) => {
  const css = await fetch(getFontUrl(name, weights)).then(x => x.text())
  const style = document.createElement("style")
  style.setAttribute("type", "text/css")
  style.appendChild(document.createTextNode(css))
  document.head.appendChild(style)
  await renderOnBody(name)
}

export const getFontUrl = (name: string, weights: number[] = []) => {
  const nameStr = name.replace(/\s/g, "+")
  const weightStr = weights.length > 0 ? `:${weights.join(",")}` : ""
  return `https://fonts.googleapis.com/css?family=${nameStr}${weightStr}`
}

export const loadFont = (name: string, weights: number[] = []) => {
  if (!loaded[name]) {
    const p = load(name, weights)
    loaded[name] = p
    p.finally(() => loaded[name] = true)
  }

  return loaded[name] === true
    ? Promise.resolve()
    : loaded[name] as Promise<void>
}

export const loadFonts = async (families: { name: string, weights?: number[] }[]) =>
  Promise.all(families.map(x => loadFont(x.name, x.weights)))