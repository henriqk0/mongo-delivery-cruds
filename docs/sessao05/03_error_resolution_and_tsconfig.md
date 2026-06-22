# Prompt 3 — Error Resolution and TypeScript Configuration

## Prompt

Error when running `make frontend-start`:

```
Could not find a required file.
  Name: index.html
  Searched in: /home/henriq/Documents/gith/mongo-delivery-cruds/frontend/public
```

Subsequent compilation errors:
- `Module not found: Error: Can't resolve './App'` — missing imports and TypeScript configuration
- `Module not found: Error: Can't resolve './App.css'`
- Missing `tsconfig.json` causing JSX and module resolution issues
- `export 'ClienteList' (imported as 'ClienteList') was not found in './pages/ClienteList'` — named vs default export mismatch
- Multiple TypeScript errors across form components (spread types, `maxLength` type mismatch, event handler types)

## Response

**Step 1 — Created `public/index.html`:**
Basic HTML template with `<div id="root"></div>` and proper meta tags.

**Step 2 — Created `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "jsx": "react-jsx",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

**Step 3 — Fixed import/export mismatch:**
Changed `App.tsx` from named imports (`import { ClienteList }`) to default imports (`import ClienteList`) since all page components use `export default`.

**Step 4 — Created `App.css`:**
Minimal CSS file to resolve the import.

**Step 5 — Fixed TypeScript errors in form components:**
- Changed `maxLength="14"` (string) to `maxLength={14}` (number)
- Changed `rows="3"` to `rows={3}`
- Fixed spread operator by casting with `as object`
- Widened event handler type to accept `HTMLSelectElement` via union types: `React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>`

**Files created/modified:**
- `frontend/public/index.html` (created)
- `frontend/tsconfig.json` (created)
- `frontend/src/App.css` (created)
- `frontend/src/App.tsx` (fixed imports)
- `frontend/src/pages/ClienteForm.tsx` (fixed types)
- `frontend/src/pages/RestauranteForm.tsx` (fixed types)
- `frontend/src/pages/ItemCardapioForm.tsx` (fixed types)
- `frontend/src/pages/EntregadorForm.tsx` (fixed types)
