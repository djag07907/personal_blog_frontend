# Hydration Best Practices

This document outlines best practices to prevent hydration errors in our Next.js application.

## 🚨 Common Causes of Hydration Errors

1. **Browser-only APIs** (localStorage, document, window) used during initial render
2. **Dynamic content** that differs between server and client
3. **Date/time rendering** without proper formatting
4. **Random values** (Math.random(), UUIDs) generated during render
5. **Conditional rendering** based on client-side state

## ✅ Solutions Implemented

### 1. Theme System
- **Problem**: localStorage access during initial render
- **Solution**: Start with default theme ("light"), initialize from localStorage after mount
- **Files**: `theme_context.tsx`, `theme_provider.tsx`, `layout.tsx`

### 2. Mounted State Pattern
- **Hook**: `useMounted()` - tracks if component has mounted
- **Usage**: Always check `mounted` before accessing browser APIs
- **File**: `hooks/use_mounted.ts`

### 3. Safe LocalStorage Hook
- **Hook**: `useLocalStorage()` - SSR-safe localStorage access
- **Usage**: Returns `null` during SSR, actual value after hydration
- **File**: `hooks/use_mounted.ts`

## 🛡️ Future-Proofing Guidelines

### DO ✅
```tsx
// ✅ Good: Use mounted state
const mounted = useMounted();
if (!mounted) return <div>Loading...</div>;
return <div>{localStorage.getItem('data')}</div>;

// ✅ Good: Default fallback for SSR
const [theme, setTheme] = useState('light'); // Match SSR default

// ✅ Good: Consistent initial state
const [isOpen, setIsOpen] = useState(false); // Always false initially

// ✅ Good: Safe date formatting
const formatDate = (date: string) => {
  if (!mounted) return ''; // Empty during SSR
  return new Date(date).toLocaleDateString();
};
```

### DON'T ❌
```tsx
// ❌ Bad: Browser API during render
const [theme] = useState(() => localStorage.getItem('theme')); // Hydration error!

// ❌ Bad: Different server/client content
const [id] = useState(Math.random()); // Different on server vs client

// ❌ Bad: Conditional structure
if (typeof window !== 'undefined') {
  return <ComponentA />; // Different structure server vs client
}
return <ComponentB />;

// ❌ Bad: Direct browser API access
const component = () => {
  const width = window.innerWidth; // Will crash on server
  return <div>{width}</div>;
};
```

## 🔧 Quick Fixes for Common Scenarios

### Theme/Dark Mode
```tsx
const { theme, mounted } = useContext(ThemeContext);
const className = !mounted ? 'light' : theme; // Always consistent
```

### LocalStorage Data
```tsx
const data = useLocalStorage('key', 'defaultValue');
if (!data) return <Skeleton />; // Show loading state during SSR
```

### Conditional Rendering
```tsx
const mounted = useMounted();
return (
  <div>
    <StaticContent />
    {mounted && <DynamicContent />}
  </div>
);
```

### Window/Document Access
```tsx
useEffect(() => {
  // Safe to access browser APIs here
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

## 🧪 Testing for Hydration Issues

1. **Enable React Strict Mode** (already enabled in Next.js dev)
2. **Check browser console** for hydration warnings
3. **Test with JS disabled** to see SSR output
4. **Use Next.js build** to test production hydration

## 📝 Code Review Checklist

- [ ] No browser APIs (localStorage, window, document) in initial render
- [ ] Consistent initial state between server and client
- [ ] Use `useMounted()` hook for client-only logic
- [ ] Default/fallback values match SSR expectations
- [ ] No Math.random() or Date.now() in render without proper handling

## 🚀 Performance Benefits

- **No hydration errors** = faster page loads
- **Consistent rendering** = better UX
- **Proper SSR** = better SEO
- **Reduced layout shifts** = better Core Web Vitals
