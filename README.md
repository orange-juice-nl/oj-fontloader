# FontLoader
Fonts will be loaded in span tags on the body tag. 
The spans contain the "font-test". You can apply styling to this class.
The fonts MUST be visible in order to load successfully (so no visibility:hidden, display:none or opacity:0)

## isLoaded 
`FontLoader.isLoaded(name: string): boolean`
```typescript
FontLoader.isLoaded("Bellota")
```

## loadCustomFont 
`FontLoader.loadCustomFont(name: string, url: string): Promise<string>`
```typescript
FontLoader.loadCustomFont("Orange Juice","https://host.nl/assets/fonts/oj.woff2")
```

## loadCustomFonts 
`FontLoader.loadCustomFonts(families: { name: string, url: string }[]): Promise<[string[], string[]]>`
```typescript
FontLoader.loadCustomFonts([{ name: "Orange Juice", url: "https://host.nl/assets/fonts/oj.woff2" }, { name: "Orange Juice - Light", url: "https://host.nl/assets/fonts/oj.light.woff2" }])
```

## loadGoogleFont 
`FontLoader.loadGoogleFont(name: string, weights: number[] = []): Promise<string>`
```typescript
FontLoader.loadGoogleFont("Bellota")
FontLoader.loadGoogleFont("Bellota", [300, 400, 700])
```

## loadGoogleFonts 
`FontLoader.loadGoogleFonts(families: { name: string, weights?: number[] }[]): Promise<[string[], string[]]>`
```typescript
FontLoader.loadGoogleFonts([{ name: "Bellota", weights: [300, 400, 700] }, { name: "Montserrat" }])
```