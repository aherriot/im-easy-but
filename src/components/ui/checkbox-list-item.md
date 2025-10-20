# CheckboxListItem Component

A modern, branded checkbox component designed for list selections with a clean, interactive design and strikethrough effect when checked.

## Features

✅ **Large interactive targets** - Full-width clickable area for easy selection  
✅ **No gaps between items** - Seamless list appearance  
✅ **Strikethrough effect** - Visual feedback when items are checked off  
✅ **Custom styling** - Brand-aligned colors and hover states  
✅ **Accessibility** - Proper ARIA support and keyboard navigation  
✅ **Smooth animations** - Transitions for all state changes

## Usage

```tsx
import { CheckboxListItem } from "@/components/ui/checkbox-list-item";

// In a list container
<div className="bg-white rounded-lg shadow-md overflow-hidden">
  <CheckboxListItem
    id="item-1"
    label="Italian"
    checked={isChecked}
    onChange={(checked) => handleChange(checked)}
  />
  <CheckboxListItem
    id="item-2"
    label="Mexican"
    checked={isChecked2}
    onChange={(checked) => handleChange2(checked)}
  />
</div>;
```

## Props

| Prop        | Type                         | Required | Description                          |
| ----------- | ---------------------------- | -------- | ------------------------------------ |
| `id`        | `string`                     | ✅       | Unique identifier for the checkbox   |
| `label`     | `string`                     | ✅       | Text label to display                |
| `checked`   | `boolean`                    | ✅       | Whether the checkbox is checked      |
| `onChange`  | `(checked: boolean) => void` | ✅       | Callback when checkbox state changes |
| `className` | `string`                     | ❌       | Additional CSS classes               |

## Design Details

### Visual States

**Unchecked State:**

- White background with neutral border
- Primary orange hover effect
- Gray checkbox outline

**Checked State:**

- Primary orange checkbox with white checkmark
- Strikethrough line through label text
- Grayed out text for visual "crossed off" effect

### Interactive Features

1. **Large Touch Targets**: Full-width, minimum 64px height for easy interaction
2. **Hover Effects**: Subtle background color change on hover
3. **Active State**: Deeper color on click for tactile feedback
4. **Smooth Transitions**: All state changes animated with 200ms duration

### Accessibility

- Hidden native checkbox maintains keyboard navigation
- Proper label association with `htmlFor` and `id`
- Screen reader friendly with semantic HTML
- Focus states visible for keyboard users
- ARIA-compliant markup

## Brand Integration

The component uses the Picky Picky brand system:

- **Primary orange** (`primary-500`) for checked state
- **Neutral grays** for unchecked states
- **Hover states** use `primary-50` and `primary-100`
- **Typography** follows brand font system
- **Spacing** maintains consistent padding

## Layout Pattern

For a seamless list appearance with no gaps:

```tsx
<div className="bg-white rounded-lg shadow-md overflow-hidden">
  {items.map((item) => (
    <CheckboxListItem
      key={item.id}
      id={item.id}
      label={item.name}
      checked={checkedItems.has(item.id)}
      onChange={(checked) => handleToggle(item.id, checked)}
    />
  ))}
</div>
```

The outer container provides:

- White background
- Rounded corners
- Shadow for elevation
- `overflow-hidden` to clip rounded corners

## Examples in App

Used in multiple restriction selection screens:

### Cuisine Selection

```tsx
<CheckboxListItem
  id="italian"
  label="Italian"
  checked={isRestricted}
  onChange={(checked) => toggleRestriction("cuisine", "italian", checked)}
/>
```

### Diet Selection

```tsx
<CheckboxListItem
  id="vegetarian"
  label="Vegetarian"
  checked={hasRestriction}
  onChange={(checked) => updateDiet("vegetarian", checked)}
/>
```

### Price Range

```tsx
<CheckboxListItem
  id="expensive"
  label="$$$$"
  checked={isExcluded}
  onChange={(checked) => togglePrice("expensive", checked)}
/>
```

## Customization

You can add custom classes for specific use cases:

```tsx
<CheckboxListItem
  id="item-1"
  label="Special Item"
  checked={checked}
  onChange={handleChange}
  className="border-t-2 border-primary-500" // Highlight first item
/>
```

## Browser Support

Works in all modern browsers with CSS Grid and Flexbox support:

- Chrome/Edge 80+
- Firefox 75+
- Safari 13+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Minimal re-renders with React.forwardRef
- Efficient CSS transitions
- No external dependencies beyond React
- Small bundle size impact
