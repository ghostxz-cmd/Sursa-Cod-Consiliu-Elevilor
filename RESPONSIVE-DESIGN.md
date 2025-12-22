# Sistem Responsive Design - Consiliul Elevilor Website

## 📱 Prezentare Generală

Website-ul Consiliului Elevilor este acum complet responsive și optimizat pentru toate dispozitivele mobile, tablete și desktop-uri.

## 🎨 Fișiere CSS Responsive

### 1. **globals.css**
- Setări de bază pentru toate paginile
- Previne scroll-ul orizontal
- Smooth scrolling
- Font-uri responsive

### 2. **mobile-responsive.css**
- Stiluri responsive pentru toate elementele
- Media queries pentru mobile (max-width: 768px)
- Media queries pentru tablet (769px - 1024px)
- Media queries pentru mobile mic (max-width: 480px)
- Stiluri pentru landscape orientation

### 3. **mobile-optimizations.css**
- Optimizări specifice pentru mobile
- Touch targets (48px minimum)
- Typography scalabilă cu clamp()
- Grid și Flex auto-responsive
- Formulare optimizate pentru mobile
- Previne zoom pe iOS
- Smooth transitions
- Accessibility improvements

### 4. **responsive-utilities.css**
- Clase utility pentru responsive design
- Display utilities (.mobile-only, .desktop-only)
- Spacing utilities (.mobile-p-*, .mobile-m-*)
- Text utilities (.mobile-text-center, .mobile-text-lg)
- Layout utilities (.mobile-flex-column, .mobile-grid-1)

### 5. **responsive.css**
- Stiluri responsive existente pentru compatibilitate

## 📐 Breakpoints

```css
/* Small Mobile */
@media (max-width: 480px) { }

/* Mobile */
@media (max-width: 768px) { }

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }

/* Landscape Mobile */
@media (max-height: 500px) and (orientation: landscape) { }
```

## 🎯 Caracteristici Principale

### ✅ Auto-Responsive
- **Grid-uri**: Toate grid-urile devin 1 coloană pe mobile automat
- **Flex-box**: Toate containerele flex devin column pe mobile
- **Imagini**: Scalează automat la 100% lățime
- **Typography**: Folosește clamp() pentru scalare fluidă

### ✅ Touch Optimization
- Toate elementele interactive au minimum 48px înălțime/lățime
- Spacing generos pentru atingere ușoară
- Hover states dezactivate pe touch devices

### ✅ Performance
- GPU acceleration pentru animații
- Lazy loading pentru imagini
- Reducere de repaints cu backface-visibility
- Smooth scrolling optimizat

### ✅ Accessibility
- Focus states vizibile
- Support pentru prefers-reduced-motion
- Support pentru prefers-contrast
- Dark mode ready (opțional)

## 🚀 Cum să Folosești

### Automat
Toate paginile primesc automat stiluri responsive prin `layout.tsx`:

```tsx
import './globals.css';
import './responsive.css';
import './mobile-responsive.css';
import './mobile-optimizations.css';
import './responsive-utilities.css';
```

### Clase Utility
Poți adăuga clase utility pentru control granular:

```tsx
<div className="mobile-flex-column mobile-text-center mobile-p-2">
  <h1 className="mobile-text-2xl">Titlu</h1>
  <p className="mobile-text-sm">Descriere</p>
</div>
```

### Display Control
```tsx
<div className="desktop-only">Vizibil doar pe desktop</div>
<div className="mobile-only">Vizibil doar pe mobile</div>
```

## 📱 Header Responsive

Header-ul include:
- Logo responsive (scalează automat)
- Meniu hamburger pe mobile
- Navigation drawer cu overlay
- Smooth transitions
- Touch-friendly buttons

## 🎨 Typography Responsive

### Heading Sizes (Mobile)
```
h1: 24px - 48px (clamp)
h2: 20px - 38px (clamp)
h3: 18px - 28px (clamp)
h4: 18px - 24px (clamp)
```

### Body Text
```
p: 14px - 16px (clamp)
line-height: 1.6
```

## 🔧 Grid Responsive

### Automat
```tsx
// Desktop: 4 coloane
// Tablet: 2 coloane
// Mobile: 1 coloană
<div style={{ 
  display: 'grid', 
  gridTemplateColumns: 'repeat(4, 1fr)' 
}}>
  {items}
</div>
```

### Cu Clase
```tsx
<div className="mobile-grid-1">
  {items}
</div>
```

## 📊 Spacing System

### Mobile Spacing
```
mobile-p-1: 8px
mobile-p-2: 16px
mobile-p-3: 24px
mobile-p-4: 32px

mobile-m-1: 8px
mobile-m-2: 16px
mobile-m-3: 24px
mobile-m-4: 32px
```

## 🎯 Best Practices

### 1. Folosește clamp() pentru Typography
```css
font-size: clamp(24px, 6vw, 48px);
```

### 2. Touch Targets Minimum 48px
```css
min-height: 48px;
min-width: 48px;
```

### 3. Previne Zoom pe iOS
```css
input {
  font-size: 16px !important;
}
```

### 4. Smooth Scrolling
```css
html {
  scroll-behavior: smooth;
}
```

### 5. Overflow Hidden
```css
body {
  overflow-x: hidden;
}
```

## 🧪 Testare

### Devices de Testat
- iPhone SE (375px)
- iPhone 12/13/14 (390px)
- iPhone 14 Pro Max (430px)
- Samsung Galaxy S21 (360px)
- iPad (768px)
- iPad Pro (1024px)

### Orientation
- Portrait
- Landscape

### Browsers
- Safari iOS
- Chrome Android
- Firefox Mobile
- Samsung Internet

## 🐛 Troubleshooting

### Probleme Comune

**1. Scroll Orizontal**
```css
body {
  overflow-x: hidden;
}
```

**2. Zoom pe Input (iOS)**
```css
input {
  font-size: 16px !important;
}
```

**3. Grid Nu Se Adaptează**
```css
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr !important;
  }
}
```

**4. Text Overflow**
```css
* {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

## 📈 Performance Tips

1. **Lazy Loading**: Adaugă `loading="lazy"` la imagini
2. **WebP Images**: Folosește format WebP pentru imagini mai mici
3. **CSS Containment**: Folosește `content-visibility: auto`
4. **Reduce Motion**: Respectă `prefers-reduced-motion`

## 🎨 Customizare

Pentru a customiza breakpoints, editează în `mobile-responsive.css`:

```css
/* Schimbă breakpoint-ul pentru mobile */
@media (max-width: 768px) {
  /* Stiluri mobile */
}
```

## 📚 Resurse

- [CSS Tricks - Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Tricks - Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [MDN - Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Web.dev - Responsive Web Design Basics](https://web.dev/responsive-web-design-basics/)

## ✨ Update Log

**v1.0 - 22 Decembrie 2025**
- ✅ Sistem complet de responsive design implementat
- ✅ 5 fișiere CSS responsive
- ✅ 100+ clase utility
- ✅ Header responsive cu meniu mobile
- ✅ Toate paginile optimizate pentru mobile
- ✅ Touch optimization
- ✅ Performance optimizations
- ✅ Accessibility improvements

---

**Dezvoltat pentru Consiliul Elevilor - Colegiul Tehnic Gheorghe Cartianu** 🎓
