# Design Document

## Overview

This design document outlines the architecture and implementation strategy for optimizing the performance and mobile responsiveness of a React-based portfolio website. The portfolio currently suffers from significant performance issues caused by:

1. **CustomCursor Component**: Executes on every mousemove event with heavy spring animations (500 stiffness), firing hundreds of times per second
2. **FloatingElements Component**: Six animated icons constantly moving with window.innerWidth/innerHeight calculations on every frame
3. **Spline 3D Models**: Two heavy 3D scenes (one for dark, one for light mode) with scale-150 and scale-110 transforms
4. **HeroSection Component**: Loads Spline viewer dynamically AND runs a typewriter effect constantly
5. **LoadingScreen Component**: 30ms interval updating progress (33 updates/second) for 1.5 seconds
6. **Framer Motion Overuse**: Every component has multiple motion elements with complex animations, spring physics, and transforms
7. **ProjectsSection Component**: 26 project cards with hover effects including 3D transforms (rotateY, rotateX, z: 50)
8. **Mobile Responsiveness**: Poor layout and performance on small screens

The optimization strategy focuses on:
- Reducing computational overhead through debouncing and caching
- Replacing heavy Framer Motion animations with CSS transforms where possible
- Implementing lazy loading for expensive resources
- Adding reduced motion support for accessibility and performance
- Optimizing mobile layouts and touch interactions
- Minimizing layout shifts and reflows

## Architecture

### Component Hierarchy

```
Index (Main Page)
├── LoadingScreen (Optimized)
├── Navigation (Mobile-optimized)
├── ThemeToggle
├── CustomCursor (Conditional, Optimized)
├── FloatingElements (Reduced, Optimized)
└── Main Sections
    ├── HeroSection (Lazy-loaded 3D)
    ├── AboutSection
    ├── SkillsSection
    ├── ExperienceSection
    ├── ProjectsSection (Optimized cards)
    └── ContactSection (Mobile-optimized)
```

### Performance Optimization Layers

1. **Detection Layer**: Hooks to detect device capabilities and user preferences
   - `useReducedMotion`: Detects prefers-reduced-motion media query
   - `useTouchDevice`: Detects touch capability
   - `useViewportSize`: Provides cached viewport dimensions

2. **Rendering Layer**: Conditional rendering based on device capabilities
   - Disable CustomCursor on touch devices
   - Reduce FloatingElements count on mobile
   - Lazy load Spline 3D models
   - Use intersection observer for project cards

3. **Animation Layer**: Optimized animation strategies
   - CSS transforms instead of Framer Motion where possible
   - Debounced event handlers
   - RequestAnimationFrame for smooth updates
   - Reduced spring stiffness values

## Components and Interfaces

### 1. Custom Hooks

#### useReducedMotion Hook

```typescript
interface UseReducedMotionReturn {
  prefersReducedMotion: boolean;
}

function useReducedMotion(): UseReducedMotionReturn
```

**Purpose**: Detect user's reduced motion preference for accessibility and performance.

**Implementation**: 
- Uses `window.matchMedia('(prefers-reduced-motion: reduce)')` 
- Listens for changes reactively
- Returns boolean indicating preference

#### useTouchDevice Hook

```typescript
interface UseTouchDeviceReturn {
  isTouchDevice: boolean;
}

function useTouchDevice(): UseTouchDeviceReturn
```

**Purpose**: Detect if the device has touch capability.

**Implementation**:
- Checks `'ontouchstart' in window` or `navigator.maxTouchPoints > 0`
- Returns boolean indicating touch capability

#### useViewportSize Hook

```typescript
interface ViewportSize {
  width: number;
  height: number;
}

function useViewportSize(): ViewportSize
```

**Purpose**: Provide cached viewport dimensions that update only on resize.

**Implementation**:
- Caches `window.innerWidth` and `window.innerHeight`
- Updates only on window resize events (debounced)
- Prevents recalculation on every animation frame

#### useDebounce Hook

```typescript
function useDebounce<T>(value: T, delay: number): T
```

**Purpose**: Debounce rapidly changing values.

**Implementation**:
- Uses setTimeout to delay value updates
- Clears previous timeout on new value
- Returns debounced value

### 2. Optimized CustomCursor Component

```typescript
interface CustomCursorProps {
  // No props needed
}

function CustomCursor(): JSX.Element | null
```

**Optimizations**:
1. **Conditional Rendering**: Return null on touch devices
2. **Debounced Updates**: Limit position updates to 16ms (60fps)
3. **CSS Transforms**: Use CSS transform instead of Framer Motion for position
4. **Reduced Stiffness**: Lower spring stiffness from 500 to 150
5. **RequestAnimationFrame**: Use RAF for smooth updates

**Implementation Strategy**:
- Check `useTouchDevice()` and return null if true
- Use `useDebounce` for mouse position updates
- Apply transforms via inline styles instead of Framer Motion animate prop
- Reduce spring physics parameters

### 3. Optimized FloatingElements Component

```typescript
interface FloatingElementsProps {
  maxIcons?: number; // Default 3
}

function FloatingElements({ maxIcons = 3 }: FloatingElementsProps): JSX.Element | null
```

**Optimizations**:
1. **Reduced Count**: Display maximum 3 icons (down from 6)
2. **Cached Dimensions**: Use `useViewportSize()` instead of direct window access
3. **CSS Animations**: Replace Framer Motion with CSS keyframe animations
4. **Will-Change Property**: Add `will-change: transform, opacity` sparingly
5. **Reduced Motion Support**: Render static icons when reduced motion is enabled

**Implementation Strategy**:
- Check `useReducedMotion()` and render static icons if true
- Use `useViewportSize()` for initial positioning
- Define CSS keyframes for floating animations
- Limit icons based on viewport width (3 on mobile, configurable on desktop)

### 4. Optimized HeroSection Component

```typescript
interface HeroSectionProps {
  // No props needed
}

function HeroSection(): JSX.Element
```

**Optimizations**:
1. **Lazy Loading**: Load Spline models only after critical content renders
2. **Single Model**: Load only the model for current theme
3. **Reduced Scale**: Use scale-100 on mobile (down from scale-150/scale-110)
4. **Placeholder**: Show lightweight placeholder while loading
5. **Conditional Typewriter**: Disable typewriter effect with reduced motion
6. **Model Cleanup**: Unload previous model when theme changes

**Implementation Strategy**:
- Use React.lazy() or dynamic import for Spline component
- Implement intersection observer to trigger load when section is near viewport
- Add loading state with skeleton placeholder
- Check `useReducedMotion()` to disable typewriter
- Use `useViewportSize()` to adjust scale on mobile
- Clean up Spline instance on theme change

### 5. Optimized LoadingScreen Component

```typescript
interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

function LoadingScreen({ onLoadingComplete }: LoadingScreenProps): JSX.Element
```

**Optimizations**:
1. **RequestAnimationFrame**: Replace setInterval with RAF
2. **Reduced Duration**: Complete within 1 second (down from 1.5 seconds)
3. **CSS Transforms**: Use CSS for animations instead of Framer Motion
4. **Instant Display**: Skip animation entirely with reduced motion

**Implementation Strategy**:
- Replace `setInterval` with `requestAnimationFrame` loop
- Calculate progress based on elapsed time
- Use CSS transforms for spinner rotation
- Check `useReducedMotion()` and call `onLoadingComplete` immediately if true

### 6. Optimized ProjectsSection Component

```typescript
interface ProjectsSectionProps {
  // No props needed
}

function ProjectsSection(): JSX.Element
```

**Optimizations**:
1. **CSS Hover Effects**: Replace Framer Motion hover with CSS transforms
2. **Intersection Observer**: Animate only visible cards
3. **Mobile Layout**: Single column on mobile with simplified effects
4. **Will-Change**: Apply will-change only during hover
5. **Reduced Motion**: Use opacity-only effects with reduced motion

**Implementation Strategy**:
- Define CSS classes for hover effects with transforms
- Use `useInView` hook with intersection observer for each card
- Check viewport width for mobile layout
- Add/remove will-change class on hover start/end
- Check `useReducedMotion()` for simplified effects

### 7. Mobile-Optimized Navigation Component

```typescript
interface NavigationProps {
  // No props needed
}

function Navigation(): JSX.Element
```

**Optimizations**:
1. **Touch Targets**: Minimum 44x44px touch targets
2. **Mobile Menu**: Hamburger menu for viewports < 768px
3. **Passive Listeners**: Use passive event listeners for touch events
4. **Simplified Animation**: Reduce animation complexity on mobile

**Implementation Strategy**:
- Use media queries to switch between desktop and mobile layouts
- Implement hamburger menu with slide-in drawer
- Ensure all interactive elements meet minimum touch target size
- Add `{ passive: true }` to touch event listeners

### 8. Mobile-Optimized ContactSection Component

```typescript
interface ContactSectionProps {
  // No props needed
}

function ContactSection(): JSX.Element
```

**Optimizations**:
1. **Vertical Stacking**: Stack form elements vertically on mobile
2. **Touch-Friendly Inputs**: Larger input fields with adequate spacing
3. **Simplified Validation**: Reduce real-time validation overhead
4. **Optimized Submission**: Debounce form submission

**Implementation Strategy**:
- Use flexbox with column direction on mobile
- Increase input padding and font size for touch
- Validate on blur instead of on every keystroke
- Debounce submit handler

## Data Models

### ViewportSize

```typescript
interface ViewportSize {
  width: number;
  height: number;
}
```

### MousePosition

```typescript
interface MousePosition {
  x: number;
  y: number;
}
```

### DeviceCapabilities

```typescript
interface DeviceCapabilities {
  isTouchDevice: boolean;
  prefersReducedMotion: boolean;
  isMobile: boolean; // width < 768px
}
```

### SplineModelState

```typescript
interface SplineModelState {
  isLoaded: boolean;
  isLoading: boolean;
  error: Error | null;
  currentTheme: 'light' | 'dark';
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, several redundancies were identified:
- Requirements 1.2 and 3.4 both test CustomCursor disabling on touch devices (consolidated into Property 1)
- Requirements 1.4 and 5.5 both test Spline model scaling on mobile (consolidated into Property 4)
- Multiple requirements test reduced motion behavior across components (grouped into comprehensive properties)
- Implementation details (CSS vs Framer Motion) are marked as examples rather than universal properties

### Universal Properties

**Property 1: Touch device cursor exclusion**
*For any* device with touch capability, the CustomCursor component should not render
**Validates: Requirements 1.2, 3.4**

**Property 2: Mobile viewport layout adaptation**
*For any* viewport width less than 768 pixels, all sections should render with mobile-optimized layouts including single-column grids, vertical stacking, and appropriate spacing
**Validates: Requirements 1.1, 1.5, 9.4**

**Property 3: Floating elements count limitation**
*For any* viewport, the FloatingElements component should render at most 3 animated icons
**Validates: Requirements 1.3, 4.1**

**Property 4: Mobile Spline model scaling**
*For any* viewport width less than 768 pixels, Spline 3D models should use scale-100 transform instead of larger scale values
**Validates: Requirements 1.4, 5.5**

**Property 5: Reduced motion disables spring animations**
*For any* component with spring physics animations, when reduced motion is enabled, those animations should be disabled or replaced with simple transitions
**Validates: Requirements 2.1, 2.2**

**Property 6: Reduced motion disables typewriter effect**
*For any* render of HeroSection, when reduced motion is enabled, the typewriter effect should not run and text should display instantly
**Validates: Requirements 2.3**

**Property 7: Reduced motion disables 3D transforms**
*For any* project card, when reduced motion is enabled, 3D transforms (rotateX, rotateY, z) should not be applied
**Validates: Requirements 2.4, 7.4**

**Property 8: CustomCursor debouncing rate limit**
*For any* sequence of mousemove events, CustomCursor position updates should occur at most once every 16 milliseconds
**Validates: Requirements 3.1**

**Property 9: Viewport dimensions caching**
*For any* animation frame in FloatingElements, viewport dimensions should not be recalculated (window.innerWidth/innerHeight should not be called during animations)
**Validates: Requirements 4.2**

**Property 10: Reduced motion static icons**
*For any* render of FloatingElements, when reduced motion is enabled, icons should be static without animation
**Validates: Requirements 4.4**

**Property 11: Lazy loading Spline models**
*For any* initial render of HeroSection, Spline 3D models should not load immediately but only after critical content renders or section is near viewport
**Validates: Requirements 5.1**

**Property 12: Single theme model loading**
*For any* theme state (light or dark), only the Spline model corresponding to that theme should be loaded, not both
**Validates: Requirements 5.2**

**Property 13: Theme switch model cleanup**
*For any* theme change, the previous Spline model should be unloaded before the new model loads
**Validates: Requirements 5.3**

**Property 14: Loading screen duration limit**
*For any* render of LoadingScreen, the loading sequence should complete within 1 second maximum
**Validates: Requirements 6.2**

**Property 15: Reduced motion instant loading**
*For any* render of LoadingScreen, when reduced motion is enabled, onLoadingComplete should be called immediately without animation
**Validates: Requirements 6.4**

**Property 16: Project card hover will-change scope**
*For any* project card, the will-change property should only be applied during hover duration and removed after
**Validates: Requirements 7.2**

**Property 17: Mobile disables 3D card transforms**
*For any* project card on viewports less than 768 pixels wide, 3D transforms should be disabled and replaced with simple scale effects
**Validates: Requirements 7.3**

**Property 18: Intersection observer for card animations**
*For any* project card, animations should only execute when the card is visible in the viewport (using intersection observer)
**Validates: Requirements 7.5**

**Property 19: useReducedMotion reactivity**
*For any* change to the prefers-reduced-motion media query, the useReducedMotion hook should update its return value reactively
**Validates: Requirements 8.1, 8.2**

**Property 20: Touch target minimum dimensions**
*For any* interactive element in Navigation on mobile viewports, touch targets should have minimum dimensions of 44x44 pixels
**Validates: Requirements 9.1**

**Property 21: Mobile navigation layout switch**
*For any* viewport less than 768 pixels wide, the Navigation component should use a mobile-optimized menu layout
**Validates: Requirements 9.2**

**Property 22: Explicit media dimensions**
*For any* image or media element rendered in the Portfolio Application, explicit width and height dimensions should be defined
**Validates: Requirements 10.1**

**Property 23: Compositor-only animations**
*For any* animation in the Portfolio Application, only transform and opacity properties should be animated to avoid layout recalculation
**Validates: Requirements 10.2**

**Property 24: Spline container space reservation**
*For any* render of HeroSection, space should be reserved for Spline 3D models (via min-height or aspect-ratio) before the model loads
**Validates: Requirements 10.4**

## Error Handling

### 1. Spline Model Loading Errors

**Error Scenarios**:
- Network failure during model download
- Invalid model URL
- Browser incompatibility with Spline viewer

**Handling Strategy**:
- Wrap Spline component in error boundary
- Display fallback gradient background on error
- Log error to console for debugging
- Provide retry mechanism for transient failures

### 2. Media Query Detection Failures

**Error Scenarios**:
- Browser doesn't support matchMedia
- Media query syntax errors

**Handling Strategy**:
- Provide fallback values (assume no reduced motion, no touch)
- Use try-catch around matchMedia calls
- Gracefully degrade to default behavior

### 3. Intersection Observer Unavailability

**Error Scenarios**:
- Browser doesn't support IntersectionObserver
- Observer initialization fails

**Handling Strategy**:
- Check for IntersectionObserver support before use
- Fallback to animating all cards immediately if unsupported
- Use polyfill for older browsers if necessary

### 4. RequestAnimationFrame Unavailability

**Error Scenarios**:
- Browser doesn't support requestAnimationFrame
- RAF calls fail

**Handling Strategy**:
- Fallback to setTimeout with 16ms delay
- Check for RAF support before use
- Provide polyfill for older browsers

### 5. Touch Event Handling Errors

**Error Scenarios**:
- Touch events not supported
- Passive listener not supported

**Handling Strategy**:
- Feature detect touch support
- Try passive listeners with fallback to regular listeners
- Gracefully handle missing touch events

## Testing Strategy

### Unit Testing

Unit tests will verify specific examples and edge cases:

1. **Hook Tests**:
   - useReducedMotion returns correct value for different media query states
   - useTouchDevice correctly identifies touch vs non-touch devices
   - useViewportSize returns correct dimensions and updates on resize
   - useDebounce delays value updates by specified duration

2. **Component Rendering Tests**:
   - CustomCursor renders null on touch devices
   - FloatingElements renders correct number of icons
   - LoadingScreen calls onLoadingComplete after expected duration
   - Navigation renders mobile menu below 768px width

3. **Edge Cases**:
   - Empty project list in ProjectsSection
   - Rapid theme switching in HeroSection
   - Window resize during animations
   - Simultaneous mousemove events

4. **Error Conditions**:
   - Spline model loading failure
   - Missing IntersectionObserver support
   - Invalid viewport dimensions

### Property-Based Testing

Property-based tests will verify universal properties across all inputs using **fast-check** (JavaScript property-based testing library):

1. **Configuration**:
   - Minimum 100 iterations per property test
   - Use fast-check's `fc.property()` for test definition
   - Tag each test with corresponding design property number

2. **Property Tests**:
   - Each of the 24 correctness properties will have a dedicated property-based test
   - Tests will generate random viewport sizes, device capabilities, and user preferences
   - Verify behavior holds across all generated inputs

3. **Test Tagging Format**:
   ```typescript
   // Feature: portfolio-performance-optimization, Property 1: Touch device cursor exclusion
   ```

4. **Generators**:
   - Viewport dimensions (width: 320-2560, height: 568-1440)
   - Device capabilities (touch: boolean, reducedMotion: boolean)
   - Theme states ('light' | 'dark')
   - Mouse positions (x: 0-viewport.width, y: 0-viewport.height)

5. **Property Test Examples**:
   - Generate random viewport widths and verify mobile layout triggers below 768px
   - Generate random device capabilities and verify CustomCursor behavior
   - Generate random mousemove sequences and verify debouncing rate
   - Generate random theme switches and verify model cleanup

### Integration Testing

Integration tests will verify component interactions:

1. **Theme Switching Flow**:
   - Verify Spline model unloads and new model loads
   - Check no memory leaks from old models

2. **Reduced Motion Flow**:
   - Enable reduced motion preference
   - Verify all components respond appropriately
   - Check LoadingScreen skips animation

3. **Mobile Responsiveness Flow**:
   - Resize viewport to mobile dimensions
   - Verify all sections adapt layout
   - Check touch targets meet minimum size

4. **Performance Monitoring**:
   - Measure frame rate during animations
   - Verify no layout thrashing
   - Check memory usage stays stable

### Performance Testing

Performance tests will validate optimization goals:

1. **Metrics to Track**:
   - Time to First Contentful Paint (FCP)
   - Time to Interactive (TTI)
   - Cumulative Layout Shift (CLS)
   - Frame rate during animations
   - Memory usage over time

2. **Benchmarks**:
   - FCP < 1.5s on 3G connection
   - TTI < 3s on 3G connection
   - CLS < 0.1
   - Maintain 60fps during animations
   - Memory usage stable (no leaks)

3. **Testing Tools**:
   - Lighthouse for performance audits
   - Chrome DevTools Performance panel
   - React DevTools Profiler
   - Custom performance marks and measures

## Implementation Notes

### CSS Transform Best Practices

1. Use `transform` and `opacity` for animations (GPU-accelerated)
2. Apply `will-change` only during active animations
3. Remove `will-change` after animation completes
4. Avoid animating `width`, `height`, `top`, `left`, `margin`, `padding`

### Debouncing Strategy

1. Use 16ms (60fps) for visual updates like cursor position
2. Use 150-300ms for resize events
3. Use requestAnimationFrame for animation loops
4. Batch state updates when possible

### Lazy Loading Strategy

1. Use React.lazy() for code splitting
2. Use Intersection Observer for viewport-based loading
3. Provide loading skeletons for better UX
4. Preload critical resources

### Mobile Optimization Checklist

- [ ] Touch targets ≥ 44x44px
- [ ] Viewport meta tag configured
- [ ] Reduced animation complexity
- [ ] Simplified layouts (single column)
- [ ] Larger font sizes for readability
- [ ] Adequate spacing between elements
- [ ] Passive event listeners for touch
- [ ] Disabled hover effects on touch devices

### Accessibility Considerations

1. Respect `prefers-reduced-motion` preference
2. Ensure keyboard navigation works
3. Maintain focus indicators
4. Provide text alternatives for visual content
5. Ensure sufficient color contrast
6. Support screen readers

## Dependencies

### Required Libraries

- **React 18+**: For automatic batching and concurrent features
- **Framer Motion 12+**: For remaining complex animations (reduced usage)
- **fast-check**: For property-based testing
- **@testing-library/react**: For component testing
- **@testing-library/user-event**: For user interaction testing
- **@splinetool/react-spline**: For 3D models (existing)
- **lucide-react**: For icons (existing)

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

### Polyfills (if needed)

- IntersectionObserver polyfill for older browsers
- ResizeObserver polyfill for older browsers
- requestAnimationFrame polyfill for IE11 (if supporting)

## Performance Targets

### Before Optimization (Current State)

- FCP: ~3-4s on 3G
- TTI: ~5-6s on 3G
- CLS: 0.3-0.5 (poor)
- Frame rate: 30-40fps during animations
- Mobile Lighthouse score: 40-60

### After Optimization (Target State)

- FCP: <1.5s on 3G
- TTI: <3s on 3G
- CLS: <0.1 (good)
- Frame rate: 55-60fps during animations
- Mobile Lighthouse score: 85-95

### Key Performance Improvements

1. **CustomCursor**: Reduce CPU usage by 70% through debouncing
2. **FloatingElements**: Reduce from 6 to 3 icons (50% reduction)
3. **Spline Models**: Lazy load saves ~2s on initial load
4. **LoadingScreen**: Reduce duration from 1.5s to 1s (33% faster)
5. **Project Cards**: CSS transforms reduce paint time by 60%
6. **Overall**: Expect 40-50% improvement in mobile performance

## Migration Strategy

### Phase 1: Foundation (Hooks and Utilities)

1. Create useReducedMotion hook
2. Create useTouchDevice hook
3. Create useViewportSize hook
4. Create useDebounce hook
5. Test all hooks thoroughly

### Phase 2: Component Optimizations

1. Optimize CustomCursor (debouncing, CSS transforms)
2. Optimize FloatingElements (reduce count, CSS animations)
3. Optimize LoadingScreen (RAF, reduced duration)
4. Test each component individually

### Phase 3: Lazy Loading and Mobile

1. Implement lazy loading for Spline models
2. Add mobile layouts to all sections
3. Optimize Navigation for mobile
4. Optimize ContactSection for mobile
5. Test mobile responsiveness

### Phase 4: Project Cards and Polish

1. Optimize ProjectsSection (CSS hover, intersection observer)
2. Add will-change management
3. Implement reduced motion support across all components
4. Final performance testing and tuning

### Phase 5: Validation and Deployment

1. Run full test suite (unit + property-based)
2. Perform Lighthouse audits
3. Test on real devices
4. Monitor performance metrics
5. Deploy to production

## Rollback Plan

If performance issues arise after deployment:

1. Feature flags for each optimization (can disable individually)
2. Revert to previous Framer Motion implementation if needed
3. Restore original component versions from git
4. Monitor error rates and user feedback
5. Gradual rollout to percentage of users

## Success Metrics

### Quantitative Metrics

- Lighthouse performance score increase by 30+ points
- FCP improvement of 50%+
- CLS reduction to <0.1
- Frame rate consistently above 55fps
- Bounce rate reduction on mobile by 20%+

### Qualitative Metrics

- User feedback on mobile experience
- Reduced complaints about lag/performance
- Improved accessibility compliance
- Better developer experience (cleaner code)

## Future Enhancements

1. **Service Worker**: Cache assets for offline support
2. **Image Optimization**: Use WebP format with fallbacks
3. **Code Splitting**: Further split bundles by route
4. **Prefetching**: Prefetch resources for next sections
5. **Virtual Scrolling**: For project list if it grows larger
6. **Progressive Enhancement**: Core functionality without JavaScript
