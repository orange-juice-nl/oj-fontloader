# FontLoader
Fonts will be loaded in span tags on the body tag. 
The spans contain the "font-test". You can apply styling to this class.
The fonts MUST be visible in order to load successfully (so no visibility:hidden, display:none or opacity:0)

## import 
`import * as FL from "oj-fontloader"`
```typescript
```

## isLoaded 
`isFontLoaded(name: string): boolean`
```typescript
FL.isFontLoaded("Bellota")
```

## loadFont 
`loadFont(name: string, weights: number[] = []): Promise<void>`
```typescript
await FL.loadFont("Bellota", [300, 400, 700])
```

## loadFonts 
`loadFonts(fonts: { name: string, weights?: number[] }[]): Promise<void>`
```typescript
await FL.loadFonts([
  { name: "Bellota", weights: [300, 400, 700] },
  { name: "Playfair Display", weights: [400] },
])
```